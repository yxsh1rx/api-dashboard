const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['Admin', 'Moderator', 'User'],
      default: 'User'
    },
    district: {
      type: String
    },
    status: { type: String, enum: ['Active', 'Deleted'], default: 'Active' }
  },
  { timestamps: true, strict: false }
);

module.exports = model('User', UserSchema);
