const route = require('express').Router();
const userController = require('../controllers/user.controller');

route.post('/create', userController.createUserController);
route.get('/', userController.findAllUserController);
route.get('/findById/:id', userController.findUserByIdController);
route.get('/findById/:email', userController.findUserByIdController);
route.patch('/update/:id', userController.updateUserController);
route.patch('/delete/:id', userController.deleteUserController);

module.exports = route;
