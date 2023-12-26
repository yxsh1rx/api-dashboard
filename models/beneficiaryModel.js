const { Schema, model } = require('mongoose');

const BeneficiarySchema = new Schema(
  {
    fullName: { type: String, required: true },
    sex: { type: String, enum: ['Male', 'Female'], required: true },
    dob: { type: Date, required: true },
    location: { type: String, required: true },
    phone: { type: String },
    disability: { type: Boolean, default: false },
    displacement: {
      type: String,
      enum: ['Refugee', 'Local'],
      default: 'Refugee'
    },
    support: { type: Array, default: [] },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
  },
  { timestamps: true, strict: false }
);

module.exports = model('Beneficiary', BeneficiarySchema);
