import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import customError from "../utils/customError.js";

/**
 * @description get all users
 * @method GET
 * @route api/v1/user
 * @access public
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      status: "success",
      result: users,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description add new  user
 * @method POST
 * @route api/v1/user
 * @access public
 */

export const addUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const user = await userModel.create({
      ...req.body,
      password: hashPassword,
    });

    res.status(200).json({
      status: "success",
      result: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description update single  user data
 * @method PATCH
 * @route api/v1/user/:id
 * @access public
 */
export const updateSingleUser = async (req, res, next) => {
  try {
    // invalid id check
    if (!isValidObjectId(req.params.id)) {
      throw customError("201", "invalid id");
    }
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const options = {
      $set: {
        ...req.body,
        password: hashPassword,
      },
    };
    const user = await userModel.findByIdAndUpdate(req.params.id, options, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      result: user,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * @description delete  user data
 * @method POST
 * @route api/v1/user/:id
 * @access public
 */

export const deleteSingleUser = async (req, res, next) => {
  try {
    // invalid id check
    if (!isValidObjectId(req.params.id)) {
      throw customError("201", "invalid id");
    }
    const user = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      result: "successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};
/**
 * @description get single  user data
 * @method GET
 * @route api/v1/user/:id
 * @access public
 */
export const singleUser = async (req, res, next) => {
  try {
    // invalid id check
    if (!isValidObjectId(req.params.id)) {
      throw customError("201", "invalid id");
    }

    const user = await userModel.findById(req.params.id);
    // empty data check
    if (!user) {
      throw customError("203", "No user data found");
    }
    // user data send
    res.status(200).json({
      status: "success",
      result: user,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * @description get single  user data
 * @method GET
 * @route api/v1/user/:id
 * @access public
 */
export const userRegister = async (req, res, next) => {
  try {
    
const salt = bcrypt.genSaltSync(10);
const hashPassword = bcrypt.hashSync(req.body.password, salt);
const user = await userModel.create({
  ...req.body,
  password: hashPassword,
});

    
    // user data send
    res.status(200).json({
      status: "success",
      result: user,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * @description get single  user data
 * @method GET
 * @route api/v1/user/:id
 * @access public
 */
export const userLogin = async (req, res, next) => {
  try {
    const login_user = await userModel.findOne({ email:req.body.email });

    // user email check
    if (!login_user) {
      throw customError("404", "invalid email address");
    }

    const passwordCheck = bcrypt.compareSync(req.body.password, login_user.password);

    // password check
    if (!passwordCheck) {
      throw customError(404, "wrong password");
    }
    // create token
    const token = jwt.sign(
      { _id: login_user._id,admin:req.body.admin },
      process.env.SECRET_CODE,
      { expiresIn: "1d" }
    );

   console.log(token);
    const {gender,password,photo,age,cell,trash,...login_info}=login_user._doc


    // user data send
    res.cookie('access_token',token).status(200).json({
      status: "success",
      token,
      login_user: login_info
      
    });
  } catch (error) {
    next(error);
  }
};
