const beneficiaryController = require('../controllers/beneficiaryController');
const Router = require('express').Router;
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, beneficiaryController.create);
router.get('/all', authMiddleware, beneficiaryController.getAll);
router.put('/visit/add', authMiddleware, beneficiaryController.addVisits);
router.get('/current', authMiddleware, beneficiaryController.getById);

module.exports = router;
