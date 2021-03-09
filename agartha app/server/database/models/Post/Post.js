const mongoose = require('mongoose');
const _id = mongoose.Schema.Types.ObjectId;

const blogContent = new mongoose.Schema({
  contentType: { type: String, required: true, default: 'paragraph', enum: ['paragraph', 'image', 'header']},
  paragraph: { type: String, required: false, maxlength: 3400, default: '' },
  imageSrc: { type: String, required: false, maxlength: 2300, default: '' },
  header: { type: String, required: false, maxlength: 350, default: '' },
})

const PostSchema = new mongoose.Schema({
  writter: { type: _id, ref: 'Profile', required: true },
  postType: { type: String, require: true, enum: ['blog', 'article', 'question'], default: 'blog'},
  title: { type: String, required: true, maxlength: 256 },
  html: { type: String, required: false, maxlength: 14000 },
  question: { type: String, required: false, maxlength: 3400 },

  // this is an array of different types of content like title-paragraph-image that a blog will contain
  content: [blogContent],

  comments: { type: Number, required: true, default: 0 },
  likes: { type: Number, required: true, default: 0 },
  shared: { type: Number, required: true, default: 0 },
  wholike: [ {type: _id, required: true, ref: 'Profile'} ]
}, { timestamps: true });

PostSchema.pre('save', function(next) {
  console.log('Maybe there is a validation for pre save Mongodb hook. We\'ll see')
  next();
});

module.exports = mongoose.model('Post', PostSchema);