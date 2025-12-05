const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const AuthMiddleware = require('../middlewares/auth.middleware')


// Routes publiques
router.get('/register', AuthController.showRegisterPage);
router.post('/register',AuthMiddleware.validatePassword, AuthController.handleRegister);

router.get('/login', AuthController.showLoginPage);
router.post('/login', AuthController.handleLogin);

// Routes protégées
router.get('/home', AuthMiddleware.requireAuth, AuthController.showHomePage);
router.get('/logout', AuthMiddleware.requireAuth, AuthController.handleLogout);

module.exports = router;
