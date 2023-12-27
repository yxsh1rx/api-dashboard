const userController = require('../controllers/userController');
const Router = require('express').Router;
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');

router.post(
  '/create',
  body('password').isLength({ min: 6, max: 32 }),
  userController.create
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get(
  '/list',
  authMiddleware,
  permissionMiddleware.checkPermissions('Admin'),
  userController.getAll
);
router.put('/edit/:id', authMiddleware, userController.edit);

module.exports = router;
