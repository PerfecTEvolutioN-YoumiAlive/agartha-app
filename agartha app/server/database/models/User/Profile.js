const mongoose = require('mongoose');
const _id = mongoose.Schema.Types.ObjectId;

const ProfileSchema = new mongoose.Schema({
    // THE MAIN USER DOC - CONTAIN INFORMATION ABOUT AUTHETICATION LIKE PASSPORT-EMAIL-USERNAME AND IT IS USED AS REF ON PLENTY OTHER COLLECTIONS // BUT IT IS NOT HAS DETAILS OF PROFILE
    user: { type: _id, ref: 'User', required: true },
    
    // BASIC INFO //
    fullName: { type: String, required: true, minlength: 5, maxlength: 72, trim: true },
    firstName: { type: String, required: true, minlength: 3, maxlength: 34, trim: true },
    lastName: { type: String, required: true, minlength: 3, maxlength: 34, trim: true},
    username: { type: String, required: true, minlength: 5, maxlength: 128, trim: true, unique: true },
    Biography: { type: String, required: true, minlength: 5, maxlength: 2300, default: 'HERE IS A BIOGRAFY I AM A USER AND I AM USING MULTIVER WEBSITE' },
    gender: { type: String, required: true, enum: ['Female', 'Male'], default: 'Female'},

    // STYLINGS - MAYBE //
    color: { type: String, required: true, default: 'none' },
    Badge: { type: String, required: true, minlength: 5, maxlength: 369, default: 'badge' },

    // NO NEED - Rank

    friends: { type: Number, required: true, default: 0 },
    followers: { type: Number, required: true, default: 0 },
    following: { type: Number, required: true, default: 0 },
    stars: { type: Number, required: true, default: 0 },
    Posts: { type: Number, required: true, default: 0 },
    interests: [ { type: String, required: true, enum: ['maths', 'dev'] } ],
    profileImage: { type: String, required: true, maxlength: 14000, default: 'https://0.soompi.io/wp-content/uploads/2016/06/21183441/Rose-4.jpg' },
    description: { type: String, required: true, minlength: 3, default: 'I am using Multiverse App', maxlength: 1400 },
    public: { type: Boolean, required: true, default: false },
    autheticated: { type: Boolean, required: true, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);