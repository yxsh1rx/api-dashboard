const projectController = require('../controllers/projectController');
const Router = require('express').Router;
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');

router.post('/create', authMiddleware, projectController.create);
router.get(
  '/all',
  authMiddleware,
  permissionMiddleware.checkPermissions('Admin'),
  projectController.getAll
);

module.exports = router;
