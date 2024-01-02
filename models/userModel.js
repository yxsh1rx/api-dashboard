const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: false },
    location: { type: Array, default: [] },
    role: {
      type: String,
      enum: ['Admin', 'Moderator', 'User'],
      default: 'User'
    },
    status: { type: String, enum: ['Active', 'Deleted'], default: 'Active' }
  },
  { timestamps: true, strict: false }
);

module.exports = model('User', UserSchema);
