import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nGO: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    DonateItems: {
      name: { type: String, required: true },
      image: { type: String, required: true },
      category: { type: String, required: true },
      description: { type: String, required: true },
      Solution: { type: String, required: true },
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Charity',
        required: true,
      },
    },
    savePayment: {
      name: { type: String, required: true },
      donation: { type: String, required: true },
      description: { type: String },
      email: { type: String },
    },
    //paymentMethod: { type: String, required: true },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
    },
    paidAt: { type: Date },
    taxPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
  },
  {
    timestamps: true,
  }
)
const Donate = mongoose.model('Donate', orderSchema)
export default Donate
