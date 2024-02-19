import path from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from 'cloudinary'
import 'dotenv/config'
import 'express-async-errors'

import { errorHandlerMiddleware } from "./middleware/errorHandlerMiddleware.js";
import { authMiddleware } from "./middleware/authMiddleware.js"
import { router as authRouter } from "./routes/auth.router.js";
import { router as jobsRouter } from "./routes/jobs.router.js";
import { router as usersRouter } from "./routes/users.router.js";

const app = express()
const PORT = process.env.PORT || 5100

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
});

const __dirname = dirname(fileURLToPath(import.meta.url))


// Middleware
app.use(express.json())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.static(path.resolve(__dirname, './client/dist')))
app.use(cookieParser())

// API routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authMiddleware, jobsRouter)
app.use('/api/v1/users', authMiddleware, usersRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})


app.use('*', (req, res) => res.status(404).json({ message: 'Route not found' }))
app.use(errorHandlerMiddleware)


try {
    await mongoose.connect(process.env.DATABASE_URI)
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
} catch (error) {
    console.log(error)
    process.exit(1)
}