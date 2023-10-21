/*
 * Title: Listing Controllers 
 * Description: Handle All Listing API Controllers.
 * Author: Md Abdullah
 * Date: 10/21/23
 */

import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
    try {
        
        const listing = await Listing.create(req.body);

        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}
