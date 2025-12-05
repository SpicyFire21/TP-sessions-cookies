const AuthService = require('../services/authService');

class AuthController {

    static showHomePage(req, res) {
            res.render('home', { user: req.session.user });

    }


    static showRegisterPage(req, res) {
        res.render('register', {
            error: null,
            success: null
        });
    }

    static async handleRegister(req, res) {
        const { email, password, confirmPassword, nom, prenom } = req.body;

        if (!email || !password || !confirmPassword) {
            return res.render('register', {
                error: 'Tous les champs obligatoires doivent être remplis',
                success: null
            });
        }

        if (password !== confirmPassword) {
            return res.render('register', {
                error: 'Les mots de passe ne correspondent pas',
                success: null
            });
        }

        try {
            await AuthService.register(email, password, nom, prenom);

            res.render('register', {
                error: null,
                success: 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.'
            });

        } catch (error) {

            if (error.message === 'EMAIL_EXISTS') {
                return res.render('register', {
                    error: 'Cet email est déjà utilisé',
                    success: null
                });
            }

            console.error('Erreur inscription:', error);

            res.render('register', {
                error: 'Erreur lors de la création du compte',
                success: null
            });
        }
    }

    static showLoginPage(req, res) {
        res.render('login', {
            error: null,
            success: null
        });
    }

    static async handleLogin(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render('login', {
                error: 'Email et mot de passe requis'
            });
        }

        try {
            const result = await AuthService.login(email, password);

            req.session.user = {
                id: result.user.id,
                email: result.user.email,
                nom: result.user.nom,
                prenom: result.user.prenom
            };

            res.redirect('/home');

        } catch (error) {
            if (error.message === 'ACCOUNT_LOCKED') {
                return res.render('login', { error: 'Compte bloqué après trop de tentatives' });
            }
            if (error.message === 'INVALID_CREDENTIALS') {
                return res.render('login', {
                    error: 'Email ou mot de passe incorrect'
                });
            }

            console.error('Erreur connexion:', error);

            res.render('login', {
                error: 'Erreur lors de la connexion'
            });
        }
    }

    static handleLogout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erreur déconnexion:', err);
                return res.redirect('/home');
            }
                    res.clearCookie('connect.sid'); // 'connect.sid' est le nom par défaut du cookie de session

            res.redirect('/login');
        });
    }
}

module.exports = AuthController;
