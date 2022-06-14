import mongoose from 'mongoose'

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connection established to mongodb')
    })
    .catch((err) => {
      console.log(err.message)
    })
}
export default connectDB
