/*
 * Title: Listing Router 
 * Description: Handle All Listing Related API
 * Author: Md Abdullah
 * Date: 10/21/23
 */


//Dependencies:
import express from 'express';
import { createListing, deleteListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();


//Routes:
router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken,updateListing);


export default router;
