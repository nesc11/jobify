import express from 'express'

import { getCurrentUser, getApplicationStats, updateUser } from '../controllers/user.controller.js'
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js'
import { checkTestUserMiddleware } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/multerMiddleware.js'


export const router = express.Router()

router.route('/current-user').get(getCurrentUser)
router.route('/admin/app-stats').get(getApplicationStats)
router.route('/update-user').patch(checkTestUserMiddleware, upload.single('avatar'), validateUpdateUserInput, updateUser)