const projectController = require('../controllers/projectController');
const Router = require('express').Router;
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, projectController.create);
router.get('/list', authMiddleware, projectController.getAll);

module.exports = router;
