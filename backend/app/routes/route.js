const express = require('express');
const todolist = require('../controllers/controller');

const router = express.Router();

router.route('/')
    .get(todolist.findAll)
    .post(todolist.create)
    .delete(todolist.deleteAll);

router.route('/complete')
    .get(todolist.findAllComplete);

router.route('/:id')
    .get(todolist.findOne)
    .put(todolist.update)
    .delete(todolist.delete);

module.exports = router;