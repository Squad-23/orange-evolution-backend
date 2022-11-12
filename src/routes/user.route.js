import router from 'express';
import userController from '../controllers/user.controller.js';
import userContentController from '../controllers/userCompleted.controller.js';
import userTrailController from '../controllers/userTrail.controller.js';
import idValidator from '../middlewares/idValidator.middleware.js';
import userValidator from '../middlewares/userValidator.middleware.js';

const route = router.Router();

// Find
route.get('/', userController.findAllUserController);
route.get('/findById/:id', idValidator.validId, userValidator.validUser, userController.findUserByIdController);
route.get('/findByEmail/:email', userController.findUserByEmailController);

//
route.post('/create', userController.createUserController);
route.patch('/update/:id', idValidator.validId, userValidator.validUser, userController.updateUserController);
route.delete('/delete/:id', idValidator.validId, userValidator.validUser, userController.deleteUserController);
route.post('/login', userController.login);

// User Trails
route.post('/:id/trails', idValidator.validId, userTrailController.subscribeUserInTrail);
route.get('/:id/trails', idValidator.validId, userTrailController.getUserSubscribedTrails);

// User Content
route.post('/:id/content/complete', idValidator.validId, userContentController.markContentAsCompleted);
route.post('/:id/content/reset', idValidator.validId, userContentController.dismarkContentAsCompleted);

export default route;
