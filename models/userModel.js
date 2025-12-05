const { db } = require('./database');

class UserModel {

    static create(email, passwordHash, nom, prenom) {
        const stmt = db.prepare(`
            INSERT INTO utilisateurs (email, password_hash, nom, prenom)
            VALUES (?, ?, ?, ?)
        `);

        const result = stmt.run(email, passwordHash, nom, prenom);

        return {
            id: result.lastInsertRowid,
            email,
            password_hash: passwordHash,
            nom,
            prenom
        };
    }

    static findByEmail(email) {
        const stmt = db.prepare(`
            SELECT * FROM utilisateurs WHERE email = ?
        `);

        return stmt.get(email) || null;
    }

    static findById(id) {
        const stmt = db.prepare(`
            SELECT * FROM utilisateurs WHERE id = ?
        `);

        return stmt.get(id) || null;
    }

    static emailExists(email) {
        const stmt = db.prepare(`
            SELECT 1 FROM utilisateurs WHERE email = ?
        `);

        return stmt.get(email) !== undefined;
    }

    static incrementFailedAttempts(userId) {
    const stmt = db.prepare(`UPDATE utilisateurs SET tentatives_echec = tentatives_echec + 1 WHERE id = ?`);
    stmt.run(userId);
}

    static resetFailedAttempts(userId) {
    const stmt = db.prepare(`UPDATE utilisateurs SET tentatives_echec = 0 WHERE id = ?`);
    stmt.run(userId);
}

}

module.exports = UserModel;
