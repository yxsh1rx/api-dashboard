const projectController = require('../controllers/projectController');
const Router = require('express').Router;
const router = new Router();
// const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', projectController.create);
router.get('/list', projectController.getAll);

module.exports = router;
