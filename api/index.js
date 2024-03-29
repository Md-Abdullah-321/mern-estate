/*
 * Title: App  
 * Description: Handle All App Related Functionality
 * Author: Md Abdullah
 * Date: 10/19/23
 */


//Dependencies:
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import userRouter from './routes/user.route.js';

dotenv.config();


mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log(`Connected to MongoDB`);
}).catch((err) => {
    console.log(err);
})


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


//Serve client:
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})



//Global Error Middleware:
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
