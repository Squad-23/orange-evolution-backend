/* eslint-disable import/extensions */
import router from 'express';
import contentController from '../controllers/content.controller.js';

const route = router.Router();

route.post('/create', contentController.createContentController);
route.get('/', contentController.findAllContentController);
route.get('/findBySubject/:subject', contentController.findContentBySubjectController);
route.patch('/:id', contentController.updateContentController);
route.delete('/:id', contentController.deleteContentController);

export default route;