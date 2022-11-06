const route = require('express').Router();
const userController = require('../controllers/user.controller');
const idValidator = require('../middlewares/idValidator.middleware');
const userValidator = require('../middlewares/userValidator.middleware');

route.post('/create', userController.createUserController);
route.get('/', userController.findAllUserController);
route.get('/findById/:id', idValidator.validId, userValidator.validUser, userController.findUserByIdController);
route.get('/findByEmail/:email', userController.findUserByEmailController);
route.patch('/update/:id', idValidator.validId, userValidator.validUser, userController.updateUserController);
route.delete('/delete/:id', idValidator.validId, userValidator.validUser, userController.deleteUserController);

module.exports = route;
