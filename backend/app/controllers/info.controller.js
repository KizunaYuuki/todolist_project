'use strict';

// exports
const InfoService = require("../services/info.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// create and save a new info ~ register
exports.register = async (req, res, next) => {
    if (!req.body?.username || !req.body?.password) {
        return next(new ApiError(400, "username or password can not be empty"));
    }
    try {
        const infoService = new InfoService(MongoDB.client);
        const document = await infoService.register(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the info")
        );
    }
};

// Retrieve all infos of a user from the database
exports.login = async (req, res, next) => {
    let documents = [];
    
    try {
        const infoService = new InfoService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await infoService.findByName(name);
        } else {
            documents = await infoService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving infos")
        );
    }
    
    return res.send(documents);
};