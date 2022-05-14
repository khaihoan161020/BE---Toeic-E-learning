const router = require('express').Router();

router.use('/', require('./userRoute'));
router.use('/vocab', require('./vocabRoute'));
router.use('/reading', require('./quizReadingRoute'));
router.use('/listening', require('./quizListeningRoute'));
module.exports = router;