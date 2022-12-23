import { Router } from "express";
import { check } from "express-validator";
import { loginUser, newUser, renewToken } from "../controllers/user.js";
import { validateEntries } from "../middlewares/validateEntries.js";
import { validateJWT } from "../middlewares/validateJWT.js";

const userRouter = Router()

//?routes: host/api/users
userRouter.post( '/new', [
  check('email', 'email is not valid').isEmail(),
  check('name', 'name is required and must contain at least 2 letters').not().isEmpty().isLength({ min: 2 }),
  check('password', 'password must contain at least 6 characters').isLength({ min: 6 }),
  validateEntries
], newUser )

userRouter.post( '/', loginUser )

userRouter.get( '/renew', validateJWT ,  renewToken )

export default userRouter

