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
