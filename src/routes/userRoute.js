const router = require('express').Router();
const { userController } = require('../controllers');
const tokenHandler = require('../handlers/tokenHandler');



router.post(
    '/login', 
    userController.login
);

router.post(
    '/register', 
    userController.register
);

router.get(
    '/user/:id', 
    tokenHandler.verifyToken ,
    userController.getOne
);

router.get(
    '/users', 
    tokenHandler.verifyAdminToken ,
    userController.getAllBasic
);
router.post(
    '/users/getAll', 
    tokenHandler.verifyAdminToken ,
    userController.getAll
);

router.post(
    '/user/update',
    tokenHandler.verifyAdminToken,
    userController.update
)
router.put(
    '/user/:id',
    tokenHandler.verifyAdminToken,
    userController.uploadImage
)
router.delete(
    '/user/:id', 
    tokenHandler.verifyAdminToken ,
    userController.deleteById
);
module.exports = router;