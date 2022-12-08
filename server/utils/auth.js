const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhh';
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }) {

        let token = req.body.token || req.query.token || req.headers.authorization;

        // returns actual token
        if (req.headers.authorization) {
            token = token.split('').pop().trim();
        }

        // return require if there is no token
        if (!token) {
            return req;
        }

        // verify token and add user data
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        return req;
    },

    // function for signing token
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};