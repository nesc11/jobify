import mongoose from "mongoose"
import dayjs from 'dayjs'
import { StatusCodes } from "http-status-codes"

import { Job } from "../models/job.model.js"



const getJobs = async (req, res) => {
    const { search, jobStatus, jobType, sort } = req.query

    const queryObj = {
        createdBy: req.user.id,
    }

    if (search) {
        queryObj.$or = [
            { position: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } }
        ]
    }

    if (jobStatus && jobStatus !== 'all') {
        queryObj.jobStatus = jobStatus
    }
    if (jobType && jobType !== 'all') {
        queryObj.jobType = jobType
    }

    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'position',
        'z-a': '-position'
    }
    const sortKey = sortOptions[sort] || sortOptions.newest

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit)
    const totalJobs = await Job.countDocuments(queryObj)
    const numOfPages = Math.ceil(totalJobs / limit)
    res.json({ numOfPages, totalJobs, currentPage: page, jobs })
}
const createJob = async (req, res) => {
    req.body.createdBy = req.user.id
    const newJob = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ message: 'Job created successfully', job: newJob })
}
const getJob = async (req, res) => {
    const job = await Job.findById(req.params.id)
    res.json({ job })
}
const updateJob = async (req, res) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ message: 'Job modified successfully', job: updatedJob })
}
const deleteJob = async (req, res) => {
    const removedJob = await Job.findByIdAndDelete(req.params.id)
    res.json({ message: 'Job removed successfully', job: removedJob })
}

const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        {
            $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) }
        },
        {
            $group: { _id: '$jobStatus', totalQuantity: { $sum: 1 } }
        }
    ])

    let proccessedStats = {}
    stats.forEach(obj => {
        proccessedStats[obj._id] = obj.totalQuantity
    })

    const defaultStats = {
        pending: proccessedStats.pending || 0,
        interview: proccessedStats.interview || 0,
        declined: proccessedStats.declined || 0
    }

    let monthlyApplications = await Job.aggregate([
        {
            $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) }
        },
        {
            $group: { _id: {
                year: {
                    $year: '$createdAt'
                },
                month: {
                    $month: '$createdAt'
                }
            }, totalQuantity: { $sum: 1 } }
        },
        {
            $sort: { '_id.year': -1, '_id.month': -1 }
        },
        {
            $limit: 6
        }
    ])

    monthlyApplications = monthlyApplications.map(item => {
        return {
            date: dayjs().month(item._id.month - 1).year(item._id.year).format('MMM YY'),
            count: item.totalQuantity
        }
    }).reverse()
    
    res.json({ defaultStats, monthlyApplications })
}

export {
    getJobs, createJob, getJob, updateJob, deleteJob, showStats
}