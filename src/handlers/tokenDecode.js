const jsonwebtoken = require("jsonwebtoken");
const tokenDecode = (req) => {
    console.log('here is call')
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
module.exports.tokenDecode = tokenDecode
