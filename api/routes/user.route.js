/*
 * Title: User Router 
 * Description: Handle Alle User Router.
 * Author: Md Abdullah
 * Date: 10/14/23
 */


//Dependencies:
import express from 'express';
import { test } from '../controllers/user.controller.js';

const userRouter = express.Router();


//Routes:
userRouter.get('/test', test);


export default userRouter;