const router = require('express').Router();
const { vocabController } = require('../controllers');
const tokenHandler = require('../handlers/tokenHandler');



router.post(
    '/', 
    tokenHandler.verifyToken,
    vocabController.create
);
router.get(
    '/getAllBasic', 
    tokenHandler.verifyToken,
    vocabController.getAllBasic
);
router.post(
    '/getAll', 
    tokenHandler.verifyToken,
    vocabController.getAll
);
router.post(
    '/updateInfo', 
    tokenHandler.verifyToken,
    vocabController.update
);
router.delete(
    '/:id', 
    tokenHandler.verifyToken,
    vocabController.deleteById
);
router.post(
    '/quiz', 
    tokenHandler.verifyToken,
    vocabController.quizReading
);
router.post(
    '/postQuiz', 
    tokenHandler.verifyToken,
    vocabController.postQuiz
);
module.exports = router;