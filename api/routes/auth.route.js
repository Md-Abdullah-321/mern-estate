import express from 'express';
import { signup } from '../controllers/auth.contoller.js';

const authRouter = express();

authRouter.post('/signup', signup)


export default authRouter;