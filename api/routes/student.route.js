import express from "express";
import { addStudent, deleteSingleStudent, getAllStudents, singleStudent, updateSingleStudent } from "../controllers/student.controllers.js";
const router =express.Router()


router.route('/')
.get(getAllStudents)
.post(addStudent)

router.route("/:id")
.get(singleStudent)
.patch(updateSingleStudent)
.put(updateSingleStudent)
.delete(deleteSingleStudent)


export default router;