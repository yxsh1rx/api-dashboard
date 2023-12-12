const beneficiaryController = require('../controllers/beneficiaryController');
const Router = require('express').Router;
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');

router.post('/create', authMiddleware, beneficiaryController.create);
router.get(
  '/all',
  authMiddleware,
  permissionMiddleware.checkPermissions('Admin'),
  beneficiaryController.getAll
);
router.get('/all/:id', authMiddleware, beneficiaryController.getByUser);

module.exports = router;
