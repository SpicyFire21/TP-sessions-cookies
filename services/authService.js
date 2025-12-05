const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

class AuthService {

    static async register(email, password, nom, prenom) {

        if (UserModel.emailExists(email)) {
            throw new Error('EMAIL_EXISTS');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = UserModel.create(email, passwordHash, nom, prenom);

        return {
            success: true,
            message: 'Utilisateur créé avec succès',
            user: {
                id: user.id,
                email: user.email,
                nom: user.nom,
                prenom: user.prenom
            }
        };
    }

    static async login(email, password) {
    const user = UserModel.findByEmail(email);

    if (!user) {
        throw new Error('INVALID_CREDENTIALS');
    }

    // Vérifier blocage après trop de tentatives
    if (user.tentatives_echec >= 5) {
        throw new Error('ACCOUNT_LOCKED');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
        // Incrémenter le compteur seulement en cas d'échec
        UserModel.incrementFailedAttempts(user.id);
        throw new Error('INVALID_CREDENTIALS');
    }

    // Réinitialiser le compteur uniquement après succès
    if (user.tentatives_echec > 0) {
        UserModel.resetFailedAttempts(user.id);
    }

    return {
        success: true,
        user: {
            id: user.id,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom
        }
    };
}

}

module.exports = AuthService;
