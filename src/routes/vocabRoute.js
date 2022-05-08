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
router.patch(
    '/updateInfo/:id', 
    tokenHandler.verifyToken,
    vocabController.update
);
router.delete(
    '/:id', 
    tokenHandler.verifyToken,
    vocabController.deleteById
);
module.exports = router;