import jwt from 'jsonwebtoken'

const createJWT = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
}

const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET)

export { createJWT, verifyJWT }