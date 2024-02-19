import express from 'express'

import { validateJobInput, validateIdParam } from '../middleware/validationMiddleware.js'
import { checkTestUserMiddleware } from '../middleware/authMiddleware.js'
import {
    getJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob,
    showStats
} from '../controllers/jobs.controller.js'

export const router = express.Router()

router.route('/').get(getJobs).post(checkTestUserMiddleware, validateJobInput, createJob)
router.route('/stats').get(showStats)
router
    .route('/:id')
    .get(validateIdParam, getJob)
    .patch(checkTestUserMiddleware, validateIdParam, validateJobInput, updateJob)
    .delete(checkTestUserMiddleware, validateIdParam, deleteJob)
