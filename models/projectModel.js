const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['Active', 'Archived', 'Completed'],
      default: 'Active'
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
  },
  { timestamps: true }
);

module.exports = model('Project', ProjectSchema);
