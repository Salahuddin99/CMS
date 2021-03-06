import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'
import { generateToken, isAuth, isAdmin } from '../utils.js'

const userRouter = express.Router()

userRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isNGO: user.isNGO,
          token: generateToken(user),
        })
        return
      }
    }
    res.status(401).send({ message: 'Email or Password are invalid' })
  })
)

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const userList = await User.find({})
    res.send(userList)
  })
)

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
      if (user.isAdmin) {
        res.status(400).send({ message: 'Unauthorized cannot delete Admin' })
        return
      }
      const deletedUser = await user.remove()
      res.send({ message: 'User Deleted', user: deletedUser })
    } else {
      res.status(404).send({ message: 'User Not Found' })
    }
  })
)

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (user.isNGO) {
        user.nGO.companyName = req.body.nGO.companyName
        user.nGO.companylogo = req.body.nGO.companylogo
        user.nGO.description = req.body.nGO.description
        user.nGO.companyRegistrationNumber =
          req.body.nGO.companyRegistrationNumber
        user.nGO.companyAddress = req.body.nGO.companyAddress
        user.nGO.yearFounded = req.body.nGO.yearFounded
        user.nGO.contactName = req.body.nGO.contactName
        user.nGO.emailAddress = req.body.nGO.emailAddress
        user.nGO.country = req.body.nGO.country
        user.nGO.telephoneNo = req.body.nGO.telephoneNo
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8)
      }
      const updatedUser = await user.save()
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isNGO: updatedUser.isNGO,
        token: generateToken(updatedUser),
      })
    } else {
      res.status(404).send({ message: 'User Not Found' })
    }
  })
)

userRouter.put(
  '/NGO',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      user.nGO.companyName = req.body.nGO.companyName
      user.nGO.companylogo = req.body.nGO.companylogo
      user.nGO.description = req.body.nGO.description
      user.nGO.companyRegistrationNumber =
        req.body.nGO.companyRegistrationNumber
      user.nGO.companyAddress = req.body.nGO.companyAddress
      user.nGO.yearFounded = req.body.nGO.yearFounded
      user.nGO.contactName = req.body.nGO.contactName
      user.nGO.emailAddress = req.body.nGO.emailAddress
      user.nGO.country = req.body.nGO.country
      user.nGO.telephoneNo = req.body.nGO.telephoneNo
      const updatedUser = await user.save()
      res.send({ message: 'NGO process', user: updatedUser })
    } else {
      res.status(404).send({ message: 'prdouct not found' })
    }
  })
)

userRouter.get(
  '/:id',

  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
      res.send(user)
    } else {
      res.status(404).send({ message: 'User Not Found' })
    }
  })
)

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin || user.isAdmin
      user.isNGO = req.body.isNGO || user.isNGO

      const updatedUser = await user.save()
      res.send({ message: 'User Succesfully updated', user: updatedUser })
    } else {
      res.status(404).send({ message: 'User Not Found' })
    }
  })
)

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
    const createdUser = await user.save()
    if (createdUser) {
      res.status(201).send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isNGO: createdUser.isNGO,
        token: generateToken(createdUser),
      })
    } else {
      res.status(400).send({ message: 'Invalid User Data' })
    }
  })
)

export default userRouter
