import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import seedRouter from './routes/seedRoutes.js'
import userRouter from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import projectRouter from './routes/projectRoute.js'
import uploadRouter from './routes/imageuploadRouter.js'
import paymentRoute from './routes/paymentRoute.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/seed', seedRouter)
app.use('/api/users', userRouter)
app.use('/api/projects', projectRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/payment', paymentRoute)
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
// app.use(express.static(path.join(__dirname, '/frontend/build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(`${__dirname}/frontend/build/index.html`))
// })
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(frontend / build))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
