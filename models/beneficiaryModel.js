const { Schema, model } = require('mongoose');

const BeneficiarySchema = new Schema(
  {
    name: {
      first: {
        type: String,
        required: true
      },
      last: {
        type: String,
        required: true
      }
    },
    sex: { type: String, enum: ['Male', 'Female'], required: true },
    birthdate: { type: Date, required: true },
    location: { type: String },
    phone: { type: String },
    disability: { type: Boolean, default: false },
    disaggregation: {
      type: String,
      enum: ['Refugee', 'Local'],
      default: 'Refugee'
    },
    support: { type: Array },
    status: { type: String, enum: ['Active', 'Archived'], default: 'Active' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
  },
  { timestamps: true, strict: false }
);

module.exports = model('Beneficiary', BeneficiarySchema);
