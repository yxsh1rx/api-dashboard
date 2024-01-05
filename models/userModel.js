const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
    areas: { type: Array },
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
