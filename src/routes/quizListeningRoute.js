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
module.exports = router;