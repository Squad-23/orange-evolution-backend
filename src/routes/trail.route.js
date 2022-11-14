import router from 'express';
import trailController from '../controllers/trail.controller.js';
import idValidator from '../middlewares/idValidator.middleware.js';
import trailValidator from '../middlewares/trailValidator.middleware.js';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';
import admValidator from '../middlewares/admValidator.middleware.js';

const route = router.Router();

route.post('/create', tokenValidator.tokenValidator, admValidator.admValidator, trailController.createTrailController);
route.get('/', trailController.findAllTrailController);
route.get('/findById/:id', idValidator.validId, trailValidator.validTrail, trailController.findTrailByIdController);
route.get('/findByTitle/:title', trailController.findTrailByTitleController);
route.get('/findByArea/:area', trailController.findTrailByAreaController);
route.get('/findById/:id/relations', idValidator.validId, trailController.findTrailByIdWithRelationsController)
route.patch('/update/:id', tokenValidator.tokenValidator, admValidator.admValidator, idValidator.validId, trailValidator.validTrail, trailController.updateTrailController);
route.delete('/delete/:id', tokenValidator.tokenValidator, admValidator.admValidator, idValidator.validId, trailValidator.validTrail, trailController.deleteTrailController);

export default route;
