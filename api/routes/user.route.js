import express from "express";
import { addUser, deleteSingleUser, getAllUsers, singleUser, updateSingleUser, userLogin, userRegister } from "../controllers/users.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/")
.get(authMiddleware,getAllUsers)
.post(addUser);

router
  .route("/:id")
  .get(authMiddleware,singleUser)
  .patch(authMiddleware,updateSingleUser)
  .put(authMiddleware,updateSingleUser)
  .delete(authMiddleware,deleteSingleUser);


  // AUTH route

  router.route("/login")
  .post(userLogin)
  router.route("/register").post(userRegister);

export default router;
