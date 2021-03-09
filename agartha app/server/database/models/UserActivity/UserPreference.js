const mongoose = require('mongoose');
const _id = mongoose.Schema.Types.ObjectId;

const UserPreferenceSchema = new mongoose.Schema({
  auth: { type: _id, ref: 'User', required: true },
  follow_ntf: { type: Boolean, required: true, default: true },
  unfollow_ntf: { type: Boolean, required: true, default: true },
  reaction_ntf: { type: Boolean, required: true, default: true },
  comment_ntf: { type: Boolean, required: true, default: true },
  likeComment_ntf: { type: Boolean, required: true, default: true },
  xronologio_follow: { type: Boolean, required: true, default: true },
  xronologio_unfollow: { type: Boolean, required: true, default: true },
  xronologio_like: { type: Boolean, required: true, default: true },
  xronologio_comment: { type: Boolean, required: true, default: true },
  xronologio_post: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('UserPreference', UserPreferenceSchema);