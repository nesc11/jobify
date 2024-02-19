import bcrypt from "bcryptjs";

const hashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(plainPassword, salt)
}

const verifyPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

export { hashPassword, verifyPassword }