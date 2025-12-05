const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const { initDatabase } = require('./models/database');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

// Base de données
initDatabase();

// Templates EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Cookies
app.use(cookieParser());

// Sessions
app.use(session({
    secret: 'votre-cle-secrete-super-securisee',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Middleware de debug (à retirer en production)
app.use((req, res, next) => {
 console.log('='.repeat(50));
 console.log('📍 Route:', req.method, req.path);
 console.log('🍪 Session ID:', req.sessionID);
 console.log('👤 Utilisateur:', req.session.user || 'Non connecté');
 console.log('='.repeat(50));
 next();
});


// Routes
app.use('/', authRoutes);

app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
});

// Serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
