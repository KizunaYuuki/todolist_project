'use strict';

const { ObjectId } = require("mongodb");

class InfoService {
    constructor(client) {
        this.Info = client.db("todolistProject").collection("info");

        // create unipue index for username, can not create 2 info same username
        this.Info.createIndex ( { "username": 1 }, { unique: true } ) 
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractInfoData(payload) {
        const info = {
            username: payload.username, 
            password: payload.password, // skip password hash
        };
        // remove undefined fields
        Object.keys(info).forEach(
            (key) => info[key] === undefined && delete info[key]
        );
        return info;
    }

    async register(payload) {
        const info = this.extractInfoData(payload);
        const result = await this.Info.findOneAndUpdate(
            info,
            { $set: { } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }
    async find(filter) {
        const cursor = await this.Info.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
}
module.exports = InfoService;