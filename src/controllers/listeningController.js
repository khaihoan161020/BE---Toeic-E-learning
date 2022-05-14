const { Listening } = require("../models");

exports.create = async (req, res) => {
    try {
    

        const newListening = new Listening({
            question: req.body.question,
            audio: req.body.audio,
            data: req.body.data,
            creator: req.user._id,
        });
        await newListening.save();
        res.status(201).json({
            status: 1,
            message: "Create Quiz Listening Success",
            data: newListening,
        });
    } catch (err) {
        res.status(500).json({
            status: 2,
            message: err,
        });
    }
};

exports.getAllBasic = async (req, res) => {
    try {
        const data = await Listening.find({}).sort("-createdAt");
        res.status(200).json({
            status: 1,
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 2,
            message: err,
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const { page, limit, type, value } = req.body;

        let data;
        let count;
       
        if (type === "question") {
            
            data = await Listening.find({ question: { $regex: value, $options: "i" } })
                .populate("creator", "username score")
                .skip(limit * page - limit)
                .limit(limit)
                .sort("-createdAt");
            count = await Listening.find({
                question: { $regex: value, $options: "i" },
            }).count();
        }
        
        if (type === "type") {
            data = await Listening.find({ question: { $regex: value, $options: "i" } })
                .populate("creator", "username score")
                .skip(limit * page - limit)
                .limit(limit)
                .sort("-createdAt");
            count = await Vocab.find({
                question: { $regex: value, $options: "i" },
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
exports.update = async (req, res) => {
    try {
        const id = req.body.id
        const updateListening = await Listening.findByIdAndUpdate(id, {
            question: req.body.question,
            data: req.body.data,
            updatedAt: new Date(),
        });
        res.status(200).json({
            status: 1,
            message: "Update successfully",
            data: updateListening,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        await Listening.findByIdAndDelete(id);
        res.status(200).json({
            CODE: 1,
            message: "This reading is deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
