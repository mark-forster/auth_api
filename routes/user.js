const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');
const { route } = require('./post');
router
    .route('/user')
    .get(userController.getAllUser)
    .post(userController.createNewUser)
router.route('/login')
    .post(userController.login)
//change Password
router
    .route('/change/:id')
    .post(userController.changePassword);


module.exports=router;