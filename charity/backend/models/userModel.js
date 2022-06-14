import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isNGO: { type: Boolean, default: false, required: true },
    nGO: {
      companyName: String,
      companylogo: String,
      description: String,
      companyRegistrationNumber: Number,
      companyAddress: String,
      yearFounded: Number,
      contactName: String,
      emailAddress: String,
      country: String,
      telephoneNo: Number,
    },
  },
  {
    timestamps: true,
  }
)
const User = mongoose.model('User', userSchema)
export default User
