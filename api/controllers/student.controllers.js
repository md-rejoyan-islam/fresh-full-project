import studentModel from "../models/student.model.js" 
import bcrypt from 'bcryptjs'
import json from 'jsonwebtoken'
import { isValidObjectId }from "mongoose"
import customError from "../utils/customError.js"




/**
 * @description get all students
 * @method GET  
 * @route api/v1/student
 * @access public
 */
export const getAllStudents=async(req,res,next)=>{
    try {
        const students=await studentModel.find()
        res.status(200).json({
            status:"success",
            result:students
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @description add new  student
 * @method POST 
 * @route api/v1/student
 * @access public
 */

export const addStudent=async(req,res,next)=>{
    try {
        
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);
        const student=await studentModel.create({...req.body,password:hashPassword})

        
        res.status(200).json({
            status:"success",
            result:student
        })
    } catch (error) {
    next(error);
    }
}

/**
 * @description update single  student data
 * @method PATCH 
 * @route api/v1/student/:id
 * @access public
 */
export const updateSingleStudent=async(req,res,next)=>{
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
      const student = await studentModel.findByIdAndUpdate(
        req.params.id,
        options,
        { new: true }
      );
      res.status(200).json({
        status: "success",
        result: student,
      });
    } catch (error) {
        next(error);
    }
}
/**
 * @description delete  student data
 * @method POST 
 * @route api/v1/student/:id
 * @access public
 */

export const deleteSingleStudent=async(req,res,next)=>{
    try {
      // invalid id check
      if (!isValidObjectId(req.params.id)) {
        throw customError("201", "invalid id");
      }
      const student = await studentModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "success",
        result: "successfully deleted",
      });
    } catch (error) {
        next(error);
    }
}
/**
 * @description get single  student data
 * @method GET 
 * @route api/v1/student/:id
 * @access public
 */
export const singleStudent=async(req,res,next)=>{
    try {
        
        // invalid id check
         if(!isValidObjectId(req.params.id)){
            throw customError("201", "invalid id");
            
         }
        
         const student = await studentModel.findById(req.params.id);
        // empty data check
        if(!student){
            throw customError('203',"No Student data found")
        }
        // student data send
        res.status(200).json({
            status:"success",
            result:student
        })
    } catch (error) {
        next(error)
    }
}