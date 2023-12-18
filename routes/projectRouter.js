const projectController = require('../controllers/projectController');
const Router = require('express').Router;
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, projectController.create);
router.get('/all', authMiddleware, projectController.getAll);
router.get('/byId', authMiddleware, projectController.getById);

module.exports = router;
