// create and save a new todolist
exports.create = (req, res) => {
    res.send({ message: 'create handler'})
}

// find a single contact with an id
exports.findOne = (req, res) => {
    res.send({ message: 'findOne handler'})
}

//
exports.findAll = (req, res) => {
    res.send({ message: 'findAll handler'})
}

// update a todolist by the id in the request
exports.update = (req, res) => {
    res.send({ message: 'update handler'})
}

// delete a todolist with the specified id in the request
exports.delete = (req, res) => {
    res.send({ message: 'delete handler'})
}

// 
exports.deleteAll = (req, res) => {
    res.send({ message: 'deleteAll handler'})
}

// 
exports.findAllComplete = (req, res) => {
    res.send({ message: 'findAllComplete handler'})
}
