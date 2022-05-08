const jsonwebtoken = require("jsonwebtoken");
const { User } = require('../models');

const tokenDecode = (req) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ')[1];
        try {
            const tokenDecoded = jsonwebtoken.verify(
                bearer,
                process.env.TOKEN_SECRET_KEY
            );
            return tokenDecoded;
        } catch(err) {
            return false;
        }
    } else {
        return false;
    }
}

exports.verifyAdminToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        const admin = await User.findById(tokenDecoded.id);
        if (!admin || !admin.isAdmin) return res.status(403).json('Not allowed User!');
        req.admin = admin;
        next();
    } else {
        res.status(401).json('Unauthorized');
    }
}

exports.verifyToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {   
        const user = await User.findById(tokenDecoded.id);
        if (!user) return res.status(403).json('Not allowed!');
        req.user = user;
        next();
    } else {
        res.status(401).json('Unauthorized');
    }
}