const beneficiaryController = require('../controllers/beneficiaryController');
const Router = require('express').Router;
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, beneficiaryController.create);
router.put('/edit/:id', authMiddleware, beneficiaryController.edit);
router.get('/list', authMiddleware, beneficiaryController.getAll);
router.put('/add/visit', authMiddleware, beneficiaryController.visit);
router.put('/add/support/:id', authMiddleware, beneficiaryController.support);
router.put('/edit/extra/:id', authMiddleware, beneficiaryController.extra);

module.exports = router;
