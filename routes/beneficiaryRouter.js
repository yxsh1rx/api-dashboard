const beneficiaryController = require('../controllers/beneficiaryController');
const Router = require('express').Router;
const router = new Router();
// const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', beneficiaryController.create);
router.put('/edit/:id', beneficiaryController.edit);
router.get('/list', beneficiaryController.getAll);
router.put('/add/support/:id', beneficiaryController.support);

module.exports = router;
