'use strict';

const express = require('express');
const todolist = require('../controllers/todolist.controller');
const info = require('../controllers/info.controller');

const router = express.Router();

// router.route('/')
//     .get(todolist.findAll)
//     .post(todolist.create)
//     .delete(todolist.deleteAll);

// router.route('/complete')
//     .get(todolist.findAllComplete);

// router.route('/:id')
//     .get(todolist.findOne)
//     .put(todolist.update)
//     .delete(todolist.delete);

router.route('/login')
    .get(info.login);

router.route('/register')
    .post(info.register);

module.exports = router;