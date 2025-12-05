export async function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}


// middlewares/passwordMiddleware.js
export async function validatePassword(req, res, next) {
    const { password } = req.body;
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!regex.test(password)) {
        return res.render('register', {
            error: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre',
            success: null
        });
    }

    next();
}


