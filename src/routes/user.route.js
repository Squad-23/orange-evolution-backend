import router from 'express';
import userController from '../controllers/user.controller.js';
import userContentController from '../controllers/userCompleted.controller.js';
import userTrailController from '../controllers/userTrail.controller.js';
import idValidator from '../middlewares/idValidator.middleware.js';
import userValidator from '../middlewares/userValidator.middleware.js';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';
import admValidator from '../middlewares/admValidator.middleware.js';
import selfUserValidator from '../middlewares/selfUserValidator.middleware.js';

const route = router.Router();

// Find
route.get('/', tokenValidator.tokenValidator, admValidator.admValidator, userController.findAllUserController);
route.get('/findById/:id',tokenValidator.tokenValidator, selfUserValidator.selfUserValidator, idValidator.validId, userValidator.validUser, userController.findUserByIdController);
route.get('/findByEmail/:email', userController.findUserByEmailController);

//
route.post('/create', userController.createUserController);
route.patch('/update/:id', tokenValidator.tokenValidator, selfUserValidator.selfUserValidator, idValidator.validId, userValidator.validUser, userController.updateUserController);
route.delete('/delete/:id', tokenValidator.tokenValidator, selfUserValidator.selfUserValidator, idValidator.validId, userValidator.validUser, userController.deleteUserController);
route.post('/login', userController.login);
route.patch('/addAdm/:id', tokenValidator.tokenValidator, admValidator.admValidator, userValidator.validUser, userController.activeAdmController);

// User Trails
route.patch('/:id/trails', idValidator.validId, userTrailController.subscribeUserInTrail);
route.get('/:id/trails', idValidator.validId, userTrailController.getUserSubscribedTrails);

// User Content
route.patch('/:id/content/complete', idValidator.validId, userContentController.markContentAsCompleted);
route.patch('/:id/content/reset', idValidator.validId, userContentController.dismarkContentAsCompleted);

export default route;
