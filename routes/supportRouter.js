const supportController = require('../controllers/supportController');
const Router = require('express').Router;
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', supportController.create);
router.get('/list', authMiddleware, supportController.getAll);

module.exports = router;
