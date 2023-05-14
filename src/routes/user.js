import { Router } from "express";
import UserController from "../controllers/user.js";
import { uploadWithSaving } from "../services/multer.js";
import RoleGuard from "../middlewares/roles.js";
import { Roles } from "../common/enums.js";
import AuthMiddleware from "../middlewares/auth.js";

const userRouter = new Router();

userRouter.put(
  "/",
  uploadWithSaving.fields([{
    name: 'cv', maxCount: 1
  }, {
    name: 'avatar', maxCount: 1
  }]),
  AuthMiddleware({ requiredLogin: true }),
  UserController.update
);

userRouter.get("/:id", UserController.getById);

userRouter.post(
  "/byFilter",
  AuthMiddleware({ requiredLogin: true }),
  RoleGuard([Roles.Recruter]),
  UserController.getByFitler
);

export default userRouter;
