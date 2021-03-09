const mongoose = require('mongoose');
const _id = mongoose.Schema.Types.ObjectId;

const NotificationSchema = new mongoose.Schema({
  fromUser: { type: _id, ref: "User", required: false },
  fromAdmin: { type: _id, ref: "User", required: false },
  image: { type: String, required: false, maxlength: 2300 },
  toUser: { type: _id, ref: "User", required: false },
  toAll: { type: Boolean, required: true, default: false },
  notification: { type: String, required: true, default: "Νέα ειδοποίηση.", maxlength: 492 },
  ntf_action: { type: String, required: true, enum: [ "none", "follow", "message", "follow_accept" ] },
  seen: { type: String, required: true, default: false }
}, { timestamps: true })

module.exports = mongoose.model('Notification', NotificationSchema);


