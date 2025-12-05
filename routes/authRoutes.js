const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Middleware d'authentification
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

// Routes publiques
router.get('/register', AuthController.showRegisterPage);
router.post('/register', AuthController.handleRegister);

router.get('/login', AuthController.showLoginPage);
router.post('/login', AuthController.handleLogin);

// Routes protégées
router.get('/home', requireAuth, AuthController.showHomePage);
router.get('/logout', requireAuth, AuthController.handleLogout);

module.exports = router;
