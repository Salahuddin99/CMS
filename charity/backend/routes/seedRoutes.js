import express from 'express'
import Charity from '../models/CharityModel.js'
import data from '../data.js'
import User from '../models/userModel.js'

const seedRouter = express.Router()

seedRouter.get('/', async (req, res) => {
  //await Charity.deleteMany({})
  const createdProject = await Charity.insertMany(data.donation)
  //await User.deleteMany({})
  const createdUsers = await User.insertMany(data.users)
  res.send({ createdProject, createdUsers })
})
export default seedRouter
