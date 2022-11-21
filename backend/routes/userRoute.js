const { Router } = require('express');
const { auth } = require('../middleware/auth');
const userController = require('../controllers/userController');
const router = Router();

router.get('/', userController.home_get);
router.post('/signup', userController.signup_post);
router.post('/login', userController.login_post);
router.post('/logout', auth, userController.logout_post);
router.patch('/user/:id', auth, userController.user_patch);


module.exports = router;