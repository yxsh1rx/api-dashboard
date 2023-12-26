const { Schema, model } = require('mongoose');

const SupportSchema = new Schema({
  name: { type: String, required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }
});

module.exports = model('Support', SupportSchema);
