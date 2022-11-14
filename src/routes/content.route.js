import router from 'express';
import contentController from '../controllers/content.controller.js';
import tokenValidator from '../middlewares/tokenValidator.middleware.js';
import admValidator from '../middlewares/admValidator.middleware.js';

const route = router.Router();

route.post('/create', tokenValidator.tokenValidator, admValidator.admValidator, contentController.createContentController);
route.get('/', contentController.findAllContentController);
route.get('/findBySubject/:subject', contentController.findContentBySubjectController);
route.patch('/:id', tokenValidator.tokenValidator, admValidator.admValidator, contentController.updateContentController);
route.delete('/:id', tokenValidator.tokenValidator, admValidator.admValidator, contentController.deleteContentController);

route.get('/findByTitle/:title', contentController.findContentByTitleController);

export default route;
