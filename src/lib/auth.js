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
        req.flash('success','Please, singn in or sign up, then we give u all the access.') 
        res.redirect('/signin')
    }
};