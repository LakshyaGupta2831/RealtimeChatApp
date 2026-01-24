import express from 'express';
import { editProfile, search, useGetCurrentUser, useGetOtherUsers } from '../controllers/user.controllers.js';
import isAuth from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.get("/current", isAuth, useGetCurrentUser);
userRouter.get("/others", isAuth, useGetOtherUsers);
userRouter.put("/profile", isAuth, upload.single("image"), editProfile);
userRouter.get("/search", isAuth, search);

export default userRouter;