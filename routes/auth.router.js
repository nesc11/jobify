import express from 'express'

import { validateUserRegisterInput, validateUserLoginInput } from '../middleware/validationMiddleware.js'
import { register, login, logout } from '../controllers/auth.controller.js'

export const router = express.Router()

router.route('/register').post(validateUserRegisterInput, register)
router.route('/login').post(validateUserLoginInput, login)
router.route('/logout').get(logout)
