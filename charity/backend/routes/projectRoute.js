import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Charity from '../models/CharityModel.js'
import { isAuth, isAdmin, isNGO, isNGOorAdmin } from '../utils.js'

const projectRouter = express.Router()

// projectRouter.post(
//   '/',
//   isAuth,
//   isNGO,
//   expressAsyncHandler(async (req, res) => {
//     const project = new Charity({
//       nGO: req.user._id,
//       name: 'Sample Name' + Date.now(),
//       by: 'sample by',
//       category: 'Sample Category',
//       image: '/images/p1.jpg',
//       donationGoal: 0,
//       currentdonation: 0,
//       location: 'sample Name',
//       description: 'Sample Description',
//       Challenge: 'sample Challenge',
//       Solution: 'sample Solution',
//       longTermImpact: 'sample LongTermImpact',
//       additionalDocumentation: 'sample additionalDocumentation',
//       companyRegistrationNumber: 0,
//       companyAddress: 'sample companyAddress',
//       yearFounded: 0,
//       contactName: 'sample contactName',
//       emailAddress: 'sample emailAddress',
//       country: 'sample country',
//       telephoneNo: 0,
//     })
//     const createdProject = await project.save()
//     res.send({ message: 'Project Created', project: createdProject })
//   })
// )

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
      // companyRegistrationNumber: req.body.companyRegistrationNumber,
      // companyAddress: req.body.companyAddress,
      // yearFounded: req.body.yearFounded,
      // contactName: req.body.contactName,
      // emailAddress: req.body.emailAddress,
      // country: req.body.country,
      // telephoneNo: req.body.telephoneNo,
    })
    const createdProject = await project.save()
    res.send({ message: 'Project Created', project: createdProject })
  })
)

// userRouter.post(
//   '/register',
//   expressAsyncHandler(async (req, res) => {
//     const user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password, 8),
//     })
//     const createdUser = await user.save()
//     if (createdUser) {
//       res.status(201).send({
//         _id: createdUser._id,
//         name: createdUser.name,
//         email: createdUser.email,
//         isAdmin: createdUser.isAdmin,
//         isNGO: user.isNGO,
//         token: generateToken(createdUser),
//       })
//     } else {
//       res.status(400).send({ message: 'Invalid User Data' })
//     }
//   })
// )

projectRouter.put(
  '/:id',
  isAuth,
  isNGOorAdmin,
  expressAsyncHandler(async (req, res) => {
    const project = await Charity.findById(req.params.id)
    if (project) {
      project.name = req.body.name
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
    // .populate(
    //   'nGO',
    //   '_id nGO.name nGO.logo '
    // )
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

// projectRouter.post(
//   '/:id/reviews',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const product = await Charity.findById(req.params.id)
//     if (product) {
//       const review = {
//         name: req.body.name,
//         rating: Number(req.body.rating),
//         comment: req.body.comment,
//       }
//       product.reviews.push(review)
//       product.numReviews = product.reviews.length
//       product.rating =
//         product.reviews.reduce((a, c) => c.rating + a, 0) /
//         product.reviews.length
//       await product.save()
//       res.status(201).send({ message: 'Review saved successfully' })
//     } else {
//       res.status(404).send({ message: 'Product Not Found' })
//     }
//   })
// )

export default projectRouter
