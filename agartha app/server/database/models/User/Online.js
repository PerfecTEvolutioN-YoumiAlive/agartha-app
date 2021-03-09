const mongoose = require('mongoose');
const _id = mongoose.Schema.Types.ObjectId;

const OnlineSchema = new mongoose.Schema({
  user: { type: _id, ref: 'User', required: true },
  cookie: { type: String, required: true, default: '', maxlength: 2300 },
  id: { type: String, required: true, maxlength: 23 }
  // ++ any other information about login like device location etc and login access strength
}, { timestamps: true });


module.exports = mongoose.model('Online', OnlineSchema);