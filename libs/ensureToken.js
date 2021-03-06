let jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
    const bearerHeader = req.headers['x-access-token'];
    if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
     next();
    } else {
    	res.sendStatus(403);
    }
};