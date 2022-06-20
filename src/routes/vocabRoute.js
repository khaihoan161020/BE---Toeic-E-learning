const router = require('express').Router();
const { vocabController } = require('../controllers');
const tokenHandler = require('../handlers/tokenHandler');



router.post(
    '/', 
    tokenHandler.verifyAdminToken,
    vocabController.create
);
router.get(
    '/getAllBasic', 
    tokenHandler.verifyAdminToken,
    vocabController.getAllBasic
);
router.post(
    '/getAll', 
    tokenHandler.verifyAdminToken,
    vocabController.getAll
);
router.post(
    '/updateInfo', 
    tokenHandler.verifyAdminToken,
    vocabController.update
);
router.delete(
    '/:id', 
    tokenHandler.verifyAdminToken,
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