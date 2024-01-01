const Router = require('express').Router;
const router = new Router();
const userRouter = require('./userRouter');
const projectRouter = require('./projectRouter');
const beneficiaryRouter = require('./beneficiaryRouter');
const supportRouter = require('./supportRouter');

router.use('/user', userRouter);
router.use('/project', projectRouter);
router.use('/beneficiary', beneficiaryRouter);
router.use('/support', supportRouter);

module.exports = router;
