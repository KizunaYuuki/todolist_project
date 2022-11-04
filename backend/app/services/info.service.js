const { ObjectId } = require("mongodb");

class TodolistService {
    constructor(client) {
        this.Todolist = client.db("todolistProject").collection("todolists");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractTodolistData(payload) {
        const info = {
            username: payload.username,
            password: payload.password,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
        };
        // remove undefined fields
        Object.keys(todolist).forEach(
            (key) => todolist[key] === undefined && delete todolist[key]
        );
        return todolist;
    }

    async create(payload) {
        const todolist = this.extractTodolistData(payload);
        const result = await this.Todolist.findOneAndUpdate(
            todolist,
            { $set: { complete: todolist.complete === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Todolist.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Todolist.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractTodolistData(payload);
        const result = await this.Todolist.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Todolist.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findComplete() {
        return await this.find({ complete: true });
    }

    async deleteAll() {
        const result = await this.Todolist.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = TodolistService;