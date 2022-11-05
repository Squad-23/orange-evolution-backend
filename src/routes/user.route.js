const route = require('express').Router();
const userController = require('../controllers/user.controller');

route.post('/create', userController.createUserController);
route.get('/', userController.findAllUserController);
route.get('/findById/:id', userController.findUserByIdController);
route.get('/findByEmail/:email', userController.findUserByEmailController);
route.patch('/update/:id', userController.updateUserController);
route.delete('/delete/:id', userController.deleteUserController);

module.exports = route;
