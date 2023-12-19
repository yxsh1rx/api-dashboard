const { Schema, model } = require('mongoose');

const BeneficiarySchema = new Schema(
  {
    fullName: { type: String, required: true },
    sex: { type: String, enum: ['Male', 'Female'] },
    dob: { type: Date },
    location: { type: String },
    phone: { type: String },
    disability: { type: Boolean, default: false },
    displacement: {
      type: String,
      enum: ['Refugee', 'Local'],
      default: 'Refugee'
    },
    extraLessons: { type: Boolean, default: false },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project', required: true }]
  },
  { timestamps: true }
);

module.exports = model('Beneficiary', BeneficiarySchema);
