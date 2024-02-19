import { promises as fs } from 'node:fs'
import cloudinary from 'cloudinary'

import { UnauthorizedError } from '../errors/customErrors.js'
import { Job } from '../models/job.model.js'
import { User } from '../models/user.model.js'


const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user.id)
    res.json({ user: user.toJSON() })
}

// Take account that the course use a middleware
const getApplicationStats = async (req, res) => {
    if (req.user.role !== 'admin') throw new UnauthorizedError('Not authorized to access this route')
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()
    res.json({ users, jobs })
}

// Be careful if the user wants to update the role
const updateUser = async (req, res) => {
    console.log(req.body, req.file)
    const newUser = { ...req.body }
    delete newUser.password

    if (req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path)
        await fs.unlink(req.file.path)
        newUser.avatar = response.secure_url
        newUser.avatarPublicId = response.public_id
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, newUser)
    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }
    res.json({ message: 'User modified successfully' })
}


export { getCurrentUser, getApplicationStats, updateUser }