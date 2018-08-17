var {User} = require('./../models/user.js');

var authanticate = (req, res, next) => {
    User.findByToken(req.header('x-auth')).then((user) => {
        if (! user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = req.header('x-auth');
        next();
    }).catch((e) => {
        return res.sendStatus(401);
    });
}
module.exports = {authanticate};