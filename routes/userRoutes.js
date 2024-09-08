const express = require('express');
const userControllers = require('./../controllers/userControllers');
const authControllers = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);
router.post('/forgetPassword', authControllers.forgetPassword);
router.patch('/resetPassword/:token', authControllers.resetPassword);

// Protect all routes after this middleware
router.use(authControllers.protect);

router.patch('/updateMyPassword', authControllers.updatePassword);
router.get('/me', userControllers.getMe, userControllers.getUser);
router.patch('/updateMe', userControllers.updateMe);
router.delete('/deleteMe', userControllers.deleteme);

router.use(authControllers.restrictTo('admin'));
router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);
router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
