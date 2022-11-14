import router from 'express';
import moduleController from '../controllers/module.controller.js';
import idValidator from '../middlewares/idValidator.middleware.js';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';
import admValidator from '../middlewares/admValidator.middleware.js';

const route = router.Router({ mergeParams: true });

route.post('/create', tokenValidator.tokenValidator, admValidator.admValidator, idValidator.validId, moduleController.createModuleController);
route.get('/', idValidator.validId, moduleController.findByTrailIdModuleService);
route.get('/:id', idValidator.validId, moduleController.findByIdModuleService);
route.patch('/:id', tokenValidator.tokenValidator, admValidator.admValidator, idValidator.validId, moduleController.updateModuleController);
route.delete('/:id', tokenValidator.tokenValidator, admValidator.admValidator, idValidator.validId, moduleController.deleteModuleController);

export default route;
