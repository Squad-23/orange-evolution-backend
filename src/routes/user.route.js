/* eslint-disable import/extensions */
import router from 'express';
import userController from '../controllers/user.controller.js';
import idValidator from '../middlewares/idValidator.middleware.js';
import userValidator from '../middlewares/userValidator.middleware.js';

const route = router.Router();

route.post('/create', userController.createUserController);
route.get('/', userController.findAllUserController);
route.get('/findById/:id', idValidator.validId, userValidator.validUser, userController.findUserByIdController);
route.get('/findByEmail/:email', userValidator.validEmailUser, userController.findUserByEmailController);
route.put('/update/:id', idValidator.validId, userValidator.validUser, userController.updateUserController);
route.delete('/delete/:id', idValidator.validId, userController.deleteUserController);
route.post('/login', userValidator.validEmailUser, userController.login);

export default route;
