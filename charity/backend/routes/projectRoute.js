import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Charity from '../models/CharityModel.js'
import { isAuth, isAdmin, isNGO, isNGOorAdmin } from '../utils.js'

const projectRouter = express.Router()

projectRouter.post(
  '/create',
  isAuth,
  isNGOorAdmin,
  expressAsyncHandler(async (req, res) => {
    const project = new Charity({
      nGO: req.user._id,
      name: req.body.name,
      by: req.body.by,
      category: req.body.category,
      image: req.body.image,
      images: req.body.images,
      donationGoal: req.body.donationGoal,
      currentdonation: 0,
      location: req.body.location,
      description: req.body.description,
      Challenge: req.body.Challenge,
      Solution: req.body.Solution,
      longTermImpact: req.body.longTermImpact,
      additionalDocumentation: 'sample documentation',
    })
    const createdProject = await project.save()
    res.send({ message: 'Project Created', project: createdProject })
  })
)

projectRouter.put(
  '/:id',
  isAuth,
  isNGOorAdmin,
  expressAsyncHandler(async (req, res) => {
    const project = await Charity.findById(req.params.id)
    if (project) {
      project.name = req.body.name
      project.by = req.body.by
      project.category = req.body.category
      project.image = req.body.image
      project.images = req.body.images
      project.description = req.body.description
      project.Challenge = req.body.Challenge
      project.Solution = req.body.Solution
      project.longTermImpact = req.body.longTermImpact
      project.additionalDocumentation = req.body.additionalDocumentation
      project.nGO = req.user._id
      const updatedProject = await project.save()
      res.send({ message: 'Project Updated', project: updatedProject })
    } else {
      res.status(404).send({ message: 'prdouct not found' })
    }
  })
)

projectRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 12
    const page = Number(req.query.pageNumber) || 1
    const nGO = req.query.nGO ? { nGO: req.query.nGO } : {}
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
    const count = await Charity.count({ ...nGO, ...keyword })
    const projects = await Charity.find({ ...nGO, ...keyword })
      .populate('nGO', '_id nGO.name nGO.logo ')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
    res.send({ projects, page, pages: Math.ceil(count / pageSize) })
  })
)

projectRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const project = await Charity.findById(req.params.id)
    res.send(project)
  })
)

projectRouter.delete(
  '/:id',
  isAuth,
  isNGOorAdmin,
  expressAsyncHandler(async (req, res) => {
    const project = await Charity.findById(req.params.id)
    if (project) {
      const deletedProject = await project.remove()
      res.send({ message: 'Project Deleted', project: deletedProject })
    } else {
      res.status(404).send('Project Not Found')
    }
  })
)

export default projectRouter
