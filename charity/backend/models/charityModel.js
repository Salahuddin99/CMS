import mongoose from 'mongoose'

const charitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    by: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    images: [String],
    donationGoal: { type: Number, required: true },
    currentdonation: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    Challenge: { type: String, required: true },
    Solution: { type: String, required: true },
    longTermImpact: { type: String, required: true },
    additionalDocumentation: { type: String, required: true },
    // companyRegistrationNumber: { type: Number, required: true },
    // companyAddress: { type: String, required: true },
    // yearFounded: { type: Number, required: true },
    // contactName: { type: String, required: true },
    // emailAddress: { type: String, required: true },
    // country: { type: String, required: true },
    // telephoneNo: { type: Number, required: true },
    nGO: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)
const Charity = mongoose.model('Charity', charitySchema)
export default Charity
