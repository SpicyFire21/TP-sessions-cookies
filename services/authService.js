const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

/**
 * Service d'authentification - Logique métier
 */
class AuthService {
  /**
   * Enregistrer un nouvel utilisateur
   * @param {string} email - Email
   * @param {string} password - Mot de passe en clair
   * @param {string} nom - Nom
   * @param {string} prenom - Prénom
   * @returns {Object} Résultat de l'enregistrement
   */
  static async register(email, password, nom, prenom) {
    // TODO
  }

  /**
   * Authentifier un utilisateur
   * @param {string} email - Email
   * @param {string} password - Mot de passe
   * @returns {Object} Résultat de l'authentification
   */
  static async login(email, password) {
    // TODO
  }

  /**
   * Obtenir les informations d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Object} Informations utilisateur
   */
  static getUserProfile(userId) {
    //TODO
  }
}

module.exports = AuthService;
