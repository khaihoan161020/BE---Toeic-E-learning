const router = require('express').Router();
const { listeningController } = require('../controllers');
const tokenHandler = require('../handlers/tokenHandler');



router.post(
    '/', 
    tokenHandler.verifyToken,
    listeningController.create
);
router.get(
    '/getAllBasic', 
    tokenHandler.verifyToken,
    listeningController.getAllBasic
);
router.post(
    '/getAll', 
    tokenHandler.verifyToken,
    listeningController.getAll
);
router.post(
    '/updateInfo', 
    tokenHandler.verifyToken,
    listeningController.update
);
router.delete(
    '/:id', 
    tokenHandler.verifyToken,
    listeningController.deleteById
);
router.post(
    '/quiz', 
    tokenHandler.verifyToken,
    listeningController.quizReading
);
router.post(
    '/postQuiz', 
    tokenHandler.verifyToken,
    listeningController.postQuiz
);
router.post(
    '/getDataQuiz',
    tokenHandler.verifyToken,
    listeningController.getQuizUser
)
module.exports = router;