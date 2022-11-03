const route = require('express').Router();
const userController = require('../controllers/user.controller');

route.post('/', userController.createUserController);

module.exports = route;
