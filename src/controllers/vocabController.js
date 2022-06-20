const { Vocab, UserVocab } = require("../models");
const { tokenDecode } = require("../handlers/tokenDecode");
const { shuffle } = require("../handlers/shufferArray");
const moment = require('moment')
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
exports.quizReading = async (req, res) => {
    try {
        // const count = UserReading.find({listQuiz}).count
        const tokenDecoded = tokenDecode(req);
        const total = 10;
        const readOfUser = await UserVocab.find({ creator: tokenDecoded.id }).populate("vocabId");
        let count = 0;
        const vocabHistoryComeBack = readOfUser.filter(item => {
            if (item.mode === 0) {
                if ((moment(item.updatedAt).add(1, 'days')).isBefore(moment())) {
                    return item
                }
            }
            else if (item.mode === 1) {
                if ((moment(item.updatedAt).add(2, 'days')).isBefore(moment())) {
                    return item
                }
            }
            else if (item.mode === 2) {
                if ((moment(item.updatedAt).add(3, 'days')).isBefore(moment())) {
                    return item
                }
            }
        })
        const last_id = 0
        data = await Vocab.find({})
            .populate("creator", "username score")
            .skip(readOfUser.length)
            .limit(4 - vocabHistoryComeBack.length)
            .sort("createdAt");
        const maxVolumn = await Vocab.find({}).count()
        
        
       
    
        const resData = []
  
        var responseArray1 = await Promise.all(vocabHistoryComeBack.map(async (item) => {
            var random = Math.floor(Math.random() * (maxVolumn - 3))
            const randomMeans =  await Vocab.find({})
            .select('means _id')
            .skip(random)
            .limit(3)
            .sort("createdAt");
            
            const deepCloneItem = JSON.parse(JSON.stringify(item.vocabId))
          
            const meansUpdate = [{
                name: item.vocabId.means,
                isCorrect: true
            }]
            randomMeans.forEach(meanFake => {
                meansUpdate.push({
                    name: meanFake.means,
                    isCorrect: false
                })
            })
           
            resData.push({
                ...deepCloneItem,
                means: shuffle(meansUpdate),
                count: 0
            })
            return item
        }))
        var responseArray2 = await Promise.all(data.map(async (item) => {
            var random = Math.floor(Math.random() * (maxVolumn - 3))
            const randomMeans =  await Vocab.find({})
            .select('means _id')
            .skip(random)
            .limit(3)
            .sort("createdAt");
            
            const deepCloneItem = JSON.parse(JSON.stringify(item))
          
            const meansUpdate = [{
                name: item.means,
                isCorrect: true
            }]
         
            randomMeans.forEach(meanFake => {
                meansUpdate.push({
                    name: meanFake.means,
                    isCorrect: false
                })
            })
           
            resData.push({
                ...deepCloneItem,
                means: shuffle(meansUpdate),
                count: 0
            })
            return item
        }))
        res.status(200).json({
            status: 1,
            data: shuffle(resData),
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
            const arr = req.body.listQuiz;
            for ( item of arr ) {
                const newUserVocab = new UserVocab({
                    vocabId: item.vocabId,
                    mode: item.mode,
                    creator: req.user._id,
                });
                await newUserVocab.save();
            }

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