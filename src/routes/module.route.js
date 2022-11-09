import router from 'express';
import moduleController from '../controllers/module.controller.js';
import idValidator from '../middlewares/idValidator.middleware.js';

const route = router.Router({ mergeParams: true });

route.post('/create', idValidator.validId, moduleController.createModuleController);
route.get('/', idValidator.validId, moduleController.findByTrailIdModuleService);
route.get('/:id', idValidator.validId, moduleController.findByIdModuleService);
route.patch('/:id', idValidator.validId, moduleController.updateModuleController);
route.delete('/:id', idValidator.validId, moduleController.deleteModuleController);

export default route;
