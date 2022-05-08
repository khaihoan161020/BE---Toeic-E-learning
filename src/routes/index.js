const router = require('express').Router();

router.use('/', require('./userRoute'));
router.use('/vocab', require('./vocabRoute'));


module.exports = router;