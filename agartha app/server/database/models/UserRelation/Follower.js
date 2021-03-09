const mongoose = require('mongoose');
const _id = mongoose.Schema.Types.ObjectId;

const FollowerSchema = new mongoose.Schema({
  auth: { type: _id, ref: 'User', required: true },
  user: { type: _id, ref: 'User', required: true },
  status: { type: String, required: true, enum: ['active']}
}, { timestamps: true })

module.exports = mongoose.model('Follower', FollowerSchema);