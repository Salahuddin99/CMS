import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Donate from '../models/paymentModel.js'
import { isAdmin, isAuth, isNGO, isNGOorAdmin } from '../utils.js'

const paymentRoute = express.Router()

paymentRoute.get(
  '/',
  isAuth,
  isNGOorAdmin,
  expressAsyncHandler(async (req, res) => {
    const nGO = req.query.nGO ? { nGO: req.query.nGO } : {}

    const donate = await Donate.find({ ...nGO }).populate('user', 'name')
    res.send(donate)
  })
)

paymentRoute.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const donate = await Donate.find({ user: req.user._id })
    res.send(donate)
  })
)

paymentRoute.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const donate = await Donate.findById(req.params.id)
    if (donate) {
      res.send(donate)
    } else {
      res.status(404).send({ message: 'donation history Not Found' })
    }
  })
)

paymentRoute.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const donate = new Donate({
      nGO: req.body.DonateItems.nGO,
      DonateItems: req.body.DonateItems,
      savePayment: req.body.savePayment,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    })
    const createdOrder = await donate.save()
    res.status(201).send({ message: 'New Order Created', donate: createdOrder })
  })
)

paymentRoute.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const donate = await Donate.findById(req.params.id)
    if (donate) {
      const deletedonation = await donate.remove()
      res.send({ message: 'Donation deleted', donate: deletedonation })
    } else {
      res.status(404).send({ message: 'Donation Not Found' })
    }
  })
)
export default paymentRoute
