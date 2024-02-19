import { StatusCodes } from "http-status-codes"

import { User } from "../models/user.model.js"
import { hashPassword, verifyPassword } from "../utils/passwordHandling.js"
import { UnauthenticatedError } from "../errors/customErrors.js"
import { createJWT } from "../utils/jsonwebtokenHandling.js"

const register = async (req, res) => {
    const isFirstUser = await User.countDocuments() === 0
    req.body.role = isFirstUser ? 'admin': 'user'

    
    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword

    const newUser = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ message: 'user created successfully' })
}
const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const isValidUser = user && await verifyPassword(req.body.password, user.password)
    if (!isValidUser) throw new UnauthenticatedError('Invalid credentials')

    const oneDay = 1000 * 60 * 60 * 24

    const token = createJWT({ id: user._id, role: user.role })
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    })

    res.json({ message: 'user logged in successfully' })
}
const logout = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.json({ message: 'user logged out successfully' })
}


export {
    register, login, logout
}