/* eslint-disable import/extensions */
import router from 'express';
import trailController from '../controllers/trail.controller.js';
import idValidator from '../middlewares/idValidator.middleware.js';
import trailValidator from '../middlewares/trailValidator.middleware.js';

const route = router.Router();

route.post('/create', trailController.createTrailController);
route.get('/', trailController.findAllTrailController);
route.get('/findById/:id', idValidator.validId, trailValidator.validTrail, trailController.findTrailByIdController);
route.get('/findByTitle/:title', trailController.findTrailByTitleController);
route.get('/findByArea/:area', trailController.findTrailByAreaController);
route.patch('/update/:id', idValidator.validId, trailValidator.validTrail, trailController.updateTrailController);
route.delete('/delete/:id', idValidator.validId, trailController.deleteTrailController);

export default route;
