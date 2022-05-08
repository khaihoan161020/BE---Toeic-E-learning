const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { tokenDecode } = require('../handlers/tokenDecode')
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        
        if (!user) return res.status(401).json('Wrong username');
        const decryptedPass = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        if (decryptedPass !== req.body.password) return res.status(401).json('Wrong password');

        const token = jwt.sign({
            id: user._id
        }, process.env.TOKEN_SECRET_KEY);
        user.password = undefined;

        res.status(200).json({
            token,
            user
        });
    } catch(err) {
        res.status(500).json({
            status: 2,
            message: err
        });
    }
}

exports.register = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (user !== null) {
            return res.status(401).json({status: 2, message: 'Username has been used'});
        }
        const {
            username,
            password,
            dob,
            email,
        } = req.body
        const newUser = new User({
            username: username,
            password: CryptoJS.AES.encrypt(
                password,
                process.env.PASSWORD_SECRET_KEY
            ),
            dob: dob ? dob : null,
            email: email ? email : null,
        });
        
        await newUser.save();
        res.status(201).json({status: 1, message: 'Register success'})
    } catch(err) {
        res.status(500).json({
            status: 2,
            message: err
        });
    }
}

exports.update = async (req, res) => {
    try {
        // const { id } = req.params;

        const id = req.body.id
      

        const userUpdate = await User.findByIdAndUpdate(id,{
            dob: req.body.dob,
            email: req.body.email,
            score: req.body.score,
            isDeleted: req.body.isDeleted,
            updatedAt: new Date()
        })
        res.status(200).json({
            status: 1,
            message: "You has updated user successfully",
            data: userUpdate
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            status: 2,
            message: err
        })
    }
}


exports.uploadImage = async (req, res) => {
    try {
        const { id } = req.params;
        let user = await User.findOne({_id: id}) // tim vocab da tao 
        if(user && user._id.toString() !== req.params.id) return res.status(403).json('User has been created')

        const vocabUpdate = await User.findByIdAndUpdate(id,{
            image: req.body.image,
            updatedAt: new Date()
        })
        res.status(200).json({
            status: 1,
            message: "Upload image successfully",
            data: vocabUpdate
        })
    } catch(err) {
        res.status(500).json({
            status: 2,
            message: err
        });
    }
}
exports.getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        if (user) {
            res.status(200).json({
                status: 1,
                data: user
            })
        }
        else res.status(401).json({
                status: 2,
                message: "User Not Found"
            })
    } catch(err) {
        res.status(500).json({
            status: 2,
            message: err
        });
    }
}

exports.getAllBasic = async (req, res) => {
    try {
        const data = await User.find({}).sort('-createdAt');
        
        res.status(200).json({
            status: 1,
            data: data
        })
    } catch(err) {
        res.status(500).json({
            status: 2,
            message: err
        });
    }
}

exports.getAll = async (req, res) => {
    try {
        const { page, limit, type, value } = req.body;
        let data;
        let count;
        if (type === "username") {
            data = await User.find({ username: { $regex: value, $options: "i" } })
                .skip(limit * page - limit)
                .limit(limit)
                .sort("-createdAt");
            count = await User.find({
                username: { $regex: value, $options: "i" },
            }).count();
        }

        res.status(201).json({
            status: 1,
            data: {
                count: count,
                rows: data,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 2,
            message: err,
        });
    }
};
exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        
        await User.findByIdAndDelete(id);
        res.status(200).json({
            status: 1
        });
    } catch(err) {
        res.status(500).json({
            status: 2,
            message: err
        });
    }
}