const mongoose = require('mongoose');
const _id = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  // EVERY USER HAS HIS OWN PROFILE DOCUMENT FOR STORE HIS INFORMATION LIKE NAMES INRESTS ETC //
  profile: { type: _id, ref: 'Profile', required: false },
  username: { type: String, required: true, unique: true, trim: true, minlength: 5, maxlength: 92 },
  fullName: { type: String, required: true, unique: true, trim: true, minlength: 5, maxlength: 92 },
  isAccepted: { type: Boolean, required: true },
  email: { type: String, required: true, unique: true, trim: true, minlength: 5, maxlength: 92 },
  password: { type: String, required: true, minlength: 14, maxlength: 92 },
  userImage: { type: String, required: true, maxlength: 14000, default: 'https://0.soompi.io/wp-content/uploads/2016/06/21183441/Rose-4.jpg' },
  
  // TEST USER OR PRODUCTION READY USER //
  test: { type: Boolean, default: true, required: false }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema);


