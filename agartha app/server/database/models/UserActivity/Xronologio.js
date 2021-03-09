const mongoose = require('mongoose');
const _id = mongoose.Schema.Types.ObjectId;

const XronologioSchema = new mongoose.Schema({
  auth: { type: _id, ref: 'User', required: true },
  activity: { type: String, required: true, maxlength: 1400 },
  public: { type: Boolean, required: true, default: true },
  action: { type: String, required: true, default: 'none', enum: ['none', 'redirect'] },

  // bonuses
  url: {type: String, required: false, maxlength: 1440}
}, { timestamps: true });

module.exports = mongoose.model('Xronologio', XronologioSchema);