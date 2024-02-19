import fs from 'node:fs'
import mongoose from "mongoose";
import 'dotenv/config'

import { Job } from './models/job.model.js'
import { User } from './models/user.model.js'

try {
    await mongoose.connect(process.env.DATABASE_URI)
    const user = await User.findOne({ email: 'nestor@example.com' })
    const jsonJobs = JSON.parse(fs.readFileSync('./utils/MOCK_DATA.json'))
    const jobs = jsonJobs.map(job => {
        return {
            ...job, createdBy: user._id
        }
    })
    await Job.deleteMany({ createdBy: user._id })
    await Job.create(jobs)
    console.log('Success')
    process.exit(0)
} catch (error) {
    console.log(error)
    process.exit(1)
}