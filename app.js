const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

// Initialiser la base de données
initDatabase();

// Configuration du moteur de templates EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware pour les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour parser les cookies
// TODO


// Configuration des sessions
//TODO

// Logger de requêtes (pour le débogage)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/', authRoutes);

// Route par défaut - rediriger vers login
app.get('/', (req, res) => {
  // TODO
});

// Gestion des erreurs 404
//TODO

// Gestion des erreurs serveur
//TODO

// Démarrage du serveur
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Serveur démarré avec succès !');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🗄️  Base de données: SQLite`);
  console.log(`🍪 Sessions: Express-session`);
  console.log(`🎨 Moteur de templates: EJS`);
  console.log('='.repeat(50));
});
