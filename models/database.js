const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../database.sqlite'), {
 verbose: console.log 
});
db.pragma('foreign_keys = ON');
function initDatabase() {
 db.exec(`
        CREATE TABLE IF NOT EXISTS utilisateurs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            nom TEXT,
            prenom TEXT,
            date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
 console.log('✅ Base de données initialisée');
}
module.exports = { db, initDatabase };