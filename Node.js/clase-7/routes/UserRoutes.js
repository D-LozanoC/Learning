import { Router } from "express";
import { UserController } from '../controllers/userController.js';

export const createUserRouter = ({ userModel }) => {
    const userController = new UserController({ userModel })

    const userRouter = Router();

    userRouter.get('/', userController.root)

    userRouter.post('/login', userController.login)
    userRouter.post('/register', userController.register)
    userRouter.post('/logout', userController.logout)

    userRouter.get('/protected', userController.protected)

    return userRouter;
}
