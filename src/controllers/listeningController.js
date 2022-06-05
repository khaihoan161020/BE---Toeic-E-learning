const { Listening, UserListening } = require("../models");
const { tokenDecode } = require("../handlers/tokenDecode");
const { shuffle } = require("../handlers/shufferArray");
exports.create = async (req, res) => {
    try {
    

        const newListening = new Listening({
            question: req.body.question,
            audio: req.body.audio,
            data: req.body.data,
            solution: req.body.solution,
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
            status: 1,
            message: "This reading is deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
exports.quizReading = async (req, res) => {
    try {
        // const count = UserReading.find({listQuiz}).count
        const tokenDecoded = tokenDecode(req);

        const listeningOfUser = await UserListening.find({ creator: tokenDecoded.id });
        let count = 0;

        listeningOfUser.forEach((item) => {
            count += item.listQuiz.length;
        });

        data = await Listening.find({})
            .populate("creator", "username score")
            .skip(count)
            .limit(4)
            .sort("createdAt");
        res.status(200).json({
            status: 1,
            data: shuffle(data),
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
exports.postQuiz = async (req, res) => {
    try {
        const tokenDecoded = tokenDecode(req);
        if (tokenDecoded) {
            // const user = await User.findById(tokenDecoded.id);

            const newListening = new UserListening({
                listQuiz: req.body.listQuiz,
                creator: req.user._id,
            });
            await newListening.save();

            res.status(201).json({
                status: 1,
                message: "Success",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
exports.getQuizUser = async (req, res) => {
    try {
        const { page } = req.body;
        const tokenDecoded = tokenDecode(req);
        if (tokenDecoded) {
            // const user = await User.findById(tokenDecoded.id);
            const listAns = [];
            data = await UserListening.find({ creator: tokenDecoded.id })
                .populate({
                    path: "listQuiz",
                    populate: { path: "questionId" },
                })
                .skip(page*3 - 3)
                .limit(3)
                .sort("-createdAt");

            data.forEach((item) => {
                item.listQuiz.forEach((el) => {
                    listAns.push(el);
                });
            });
            count = await UserListening.find({ creator: tokenDecoded.id })
                .count();
            res.status(201).json({
                status: 1,
                message: "Success",
                data: {
                    count: count*4,
                    rows: listAns,
                },
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
