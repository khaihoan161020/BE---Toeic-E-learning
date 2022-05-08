const CryptoJS = require('crypto-js');
const { User } = require('../models');

exports.createAdmin = async () => {
    const username = process.env.DEFAULT_ADMIN_USERNAME;
    const password = process.env.DEFAULT_ADMIN_PASSWORD;

    try {
        const admin = await User.findOne({username: username});
        if (admin !== null) {
            return true
        }
      
        const newAdmin = new User({
            username: username,
            password: CryptoJS.AES.encrypt(
                password,
                process.env.PASSWORD_SECRET_KEY
            ),
            isAdmin: true
        });
        
        await newAdmin.save();
        console.log('--------------------------');
        console.log('Admin created with');
        console.log(`Username => ${username}`);
        console.log(`Password => ${password}`);
        console.log('--------------------------');
    } catch(err) {
        console.log(err);
        return false
    }
}