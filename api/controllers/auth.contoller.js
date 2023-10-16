/*
 * Title: User Auth Controller 
 * Description: Handle User Authentication
 * Author: Md Abdullah
 * Date: 10/16/23
 */



//Dependencies:
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";


export const signup = async(req, res, next) => {
    const {username, email, password} = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({message: 'user created successfully'})
    } catch (error) {
        next(errorHandler(550, 'Could not create new user.'));
    }
}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;

   
    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, 'Wrong credentials!'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
        

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);


        const { password:pass , ...rest } = validUser._doc;

        res.cookie('access_token', token, { httpOnly: true, expires: expirationDate })
        .status(200)
        .json(rest);

    } catch (error) {
        next(errorHandler(400, 'Could not find user.'));
    }
}