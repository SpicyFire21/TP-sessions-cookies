const express = require('express');
const router = express.Router();
//const AuthController = require('../controllers/authController');

// Middleware pour vérifier si l'utilisateur est authentifié
function requireAuth(req, res, next) {
  //TODO
}

// Routes publiques à completer
router.get('/register');
router.post('/register');

router.get('/login');
router.post('/login');

// Routes protégées
router.get('/home');
router.get('/logout');

module.exports = router;
