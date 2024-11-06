import express from 'express';

const router =  express.Router();
import {HandlerForUserSignUp,HandlerForUserLogin} from '../controllers/user.js';
import {AuthMiddleware} from '../middleware/auth.js'
router.post('/signup',HandlerForUserSignUp);
router.post('/login',HandlerForUserLogin);
router.get('/test',AuthMiddleware,async(req,res)=>{
    // console.log(req.header);
    // const {name} = await req.body;
    const user =  req.user;
    console.log(user)
    return res.status(200).json({message:"test Successfully ",User:user})
})

export default router;