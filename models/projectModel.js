const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    status: {
      type: String,
      enum: ['Active', 'Archived', 'Completed'],
      default: 'Active'
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
  },
  { timestamps: true, strict: false }
);

module.exports = model('Project', ProjectSchema);
