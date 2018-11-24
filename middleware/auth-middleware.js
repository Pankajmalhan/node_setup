const { createResponseBody } = require("../util/errorMessages");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) res.status(401).send(createResponseBody(401, 'Access denied, no token provided'));
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send(createResponseBody(400, 'invalid token'));
    }
}

module.exports = auth;