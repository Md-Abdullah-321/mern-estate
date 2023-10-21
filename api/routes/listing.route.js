/*
 * Title: Listing Router 
 * Description: Handle All Listing Related API
 * Author: Md Abdullah
 * Date: 10/21/23
 */


//Dependencies:
import express from 'express';
import { createListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();


//Routes:
router.post('/create',verifyToken,createListing);


export default router;
