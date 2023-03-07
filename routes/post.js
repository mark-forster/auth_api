const express=require('express');
const router=express.Router();
const postController=require('../controllers/post');
const auth=require('../middlewares/auth');
router
    .route('/post')
    .get(auth,postController.getAllposts)
    .post(auth,postController.createNewPost)



module.exports=router;