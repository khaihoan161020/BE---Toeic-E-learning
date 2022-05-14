const router = require('express').Router();
const { readingController } = require('../controllers');
const tokenHandler = require('../handlers/tokenHandler');



router.post(
    '/', 
    tokenHandler.verifyToken,
    readingController.create
);
router.get(
    '/getAllBasic', 
    tokenHandler.verifyToken,
    readingController.getAllBasic
);
router.post(
    '/getAll', 
    tokenHandler.verifyToken,
    readingController.getAll
);
router.post(
    '/updateInfo', 
    tokenHandler.verifyToken,
    readingController.update
);
router.delete(
    '/:id', 
    tokenHandler.verifyToken,
    readingController.deleteById
);
module.exports = router;