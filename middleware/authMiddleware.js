import { BadRequestError, UnauthenticatedError } from "../errors/customErrors.js"
import { verifyJWT } from "../utils/jsonwebtokenHandling.js"


const authMiddleware = (req, res, next) => {
    const { token } = req.cookies
    if (!token) throw new UnauthenticatedError('Invalid authentication')
    
    try {
        const { id, role } = verifyJWT(token)
        req.user = { id, role, testUser: id === '65ce32a93ac3da55b6bdb613' }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid authentication')
    }
}

const checkTestUserMiddleware = (req, res, next) => {
    if (req.user.testUser) throw new BadRequestError('Demo user. Read only!')
    next()
}


export { authMiddleware, checkTestUserMiddleware }