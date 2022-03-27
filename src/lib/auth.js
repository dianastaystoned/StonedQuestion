const helpers = require('./helpers');

module.exports = {
    isNotLoggedIn(req, res, next){
        if (!req.isAuthenticated) {
            return next();
        }
        return res.redirect('/signup')
    },
    isLoggedIn (req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('message','Inicia sesión para poder acceder.') 
        res.redirect('/signin')
    }
};