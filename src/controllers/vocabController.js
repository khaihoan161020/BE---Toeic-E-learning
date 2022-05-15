const { Vocab } = require("../models");

exports.create = async (req, res) => {
    try {
        const vocab = await Vocab.findOne({
            name: req.body.name,
        });

        if (vocab)
            return res
                .status(401)
                .json({ status: 2, message: "This vocab has been created" });

        const newVocab = new Vocab({
            name: req.body.name,
            example: req.body.example,
            type: req.body.type,
            means: req.body.means,
            creator: req.user._id,
        });
        await newVocab.save();
        res.status(201).json({
            status: 1,
            message: "Create vocab success",
            data: newVocab,
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
        const data = await Vocab.find({}).sort("-createdAt");
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
        console.log('type:', type)
        if (type === "name") {
            data = await Vocab.find({ name: { $regex: value, $options: "i" } })
                .populate("creator", "username score")
                .skip(limit * page - limit)
                .limit(limit)
                .sort("-createdAt");
            count = await Vocab.find({
                name: { $regex: value, $options: "i" },
            }).count();
        }
        if (type === "type") {
            data = await Vocab.find({ type: { $regex: value, $options: "i" } })
                .populate("creator", "username score")
                .skip(limit * page - limit)
                .limit(limit)
                .sort("-createdAt");
            count = await Vocab.find({
                type: { $regex: value, $options: "i" },
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
        let vocab = await Vocab.findOne({ name: req.body.name }); // tim vocab da tao
        // if (vocab && vocab._id.toString() !== req.params.id)
        //     return res.status(403).json("Vocab has been created");
        // const name = req.body.name
        const updateVocab = await Vocab.findByIdAndUpdate(vocab.id, {
            example: req.body.example,
            type: req.body.type,
            means: req.body.means,
            updatedAt: new Date(),
        });
        res.status(200).json({
            status: 1,
            message: "Update successfully",
            data: updateVocab,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        await Vocab.findByIdAndDelete(id);
        res.status(200).json({
            CODE: 1,
            message: "This vocab is deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
