import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";

import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            console.log('This middleware is executed')
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg)
                if (errorMessages[0].startsWith('Job not')) throw new NotFoundError(errorMessages)
                if (errorMessages[0].startsWith('Not authorized')) throw new UnauthorizedError('Not authorized to access this route')
                throw new BadRequestError(errorMessages)
            }
            next()
        }
    ]
}

const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid job status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type value')
])

const validateUserRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('invalid email')
        .custom(async (value) => {
            const isEmailUsed = await User.findOne({ email: value })
            console.log(value, isEmailUsed)
            if (isEmailUsed) throw new BadRequestError('Email already used')
        }),
    body('password')
        .notEmpty().withMessage('password is required')
        .isLength({ min: 8}).withMessage('password must be at least 8 characters'),
    body('lastName').notEmpty().withMessage('last name is required'),
    body('location').notEmpty().withMessage('location is required'),
    // body('role').isIn(['user', 'admin']).withMessage('invalid user role value')
])

const validateUserLoginInput = withValidationErrors([
    body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('invalid email'),
    body('password')
        .notEmpty().withMessage('password is required')
])

const validateIdParam = withValidationErrors([
    param('id').custom(async (value, { req }) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value)
        if (!isValidId) throw new BadRequestError('Invalid MongoDb id')
            
        const job = await Job.findById(value)
        if(!job) throw new NotFoundError('Job not found')

        const isAdmin = req.user.role === 'admin'
        const isOwner = req.user.id === job.createdBy.toString()
        if (!isOwner && !isAdmin) throw new UnauthorizedError('Not authorized to access this route')
    })
])

const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('invalid email')
        .custom(async (value, { req }) => {
            const isEmailUsed = await User.findOne({ value })
            if (isEmailUsed && isEmailUsed._id.toString() !== req.user.id) throw new BadRequestError('Email already used')
        }),
    body('lastName').notEmpty().withMessage('last name is required'),
    body('location').notEmpty().withMessage('location is required'),
])


export {
    validateJobInput,
    validateUserRegisterInput,
    validateUserLoginInput,
    validateIdParam,
    validateUpdateUserInput
}