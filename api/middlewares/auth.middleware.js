import jwt from "jsonwebtoken";

// user is authorized or not

import customError from "../utils/customError.js";
import userModel from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {

    // token 
    const token = req.cookies.access_token;

    // user has login or not
    if (!token) {
      throw customError(401, "you are not authorized");
    }
    const login_user = jwt.verify(token, process.env.SECRET_CODE);

    // login token validation check
    if (!login_user) {
      throw customError(404, "invalid token");
    }
    
   // login user data
    const user= await userModel.findById(login_user._id)

    // if login user is admin 
    if (user.isAdmin) {
      req.user = login_user;

      next();
    }
    // if login user is not  admin
    else {
// show  or edit only login user details
      if (login_user._id == req.params.id) {
        req.user = login_user;

        next();
      }
      // can't show  or edit others login user details
      else {
        throw customError(402, "you can't access this feature");
      }
    }



   
  
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
