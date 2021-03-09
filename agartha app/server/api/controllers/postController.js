const Post = require('../../models/Post/Post');

// <---------- GET POSTS CONTROLLER ---------->

async function getPosts (req, res) {
  try {
    const posts = await Post.find({}).populate('writter').populate('wholike', ['profileImage', 'username']);
    res.status(200).json({ message: 'here all posts', status: 200, posts })
  } catch (err) {
    console.log(err)
  }
}

// <---------- GET POST CONTROLLER ---------->

async function getPost (req, res) {
  try {
    const post = await Post.find({ '_id': req.params._id}).populate('writter').populate('wholike', ['profileImage', 'username']);
    res.status(200).json({ message: 'here all posts', status: 200, post })
  } catch (err) {
    console.log(err)
  }
}

// <---------- LIKE POST CONTROLLER ---------->

async function likePost (req, res) {
  try {
    const profileID = req.user.profile._id;
    await Post.updateOne({ '_id': req.params._id }, { $addToSet: { 'wholike': profileID }});
    res.status(201).json({ message: 'liked', status: 200 })
  } catch(err) {
    console.log(err);
  }
}

// <---------- DISLIKE POST CONTROLLER ---------->

async function dislikePost (req, res) {
  try {
    const profileID = req.user.profile._id;
    const post = await Post.findOne({ '_id': req.params._id });
    let likearray = [];

    for (let i = 0; i < post.wholike.length; i++) {
      if (`${post.wholike[i]}` !== `${profileID}`) {
        likearray.push(post.wholike[i])
      }
    }

    await Post.updateOne({ '_id': req.params._id }, { $set: { 'wholike': likearray }});
    res.status(201).json({ message: 'un-liked', status: 200, post })
  } catch (err) {
    console.log(err)
  }
}

// <---------- CREATE POST CONTROLLER ---------->

async function createPost (req, res) {
  try {
    const { title, content } = req.body;
    const { profile, username } = req.user;
    const newpost = new Post({ title, content, postType: 'blog', writter: profile._id });

    await newpost.save();
    res.status(201).json({ message: 'Post - article is succefully created' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'server error' })
  }
}

// <---------- CREATE ARTICLE POST ---------->

async function createArticlePost (req, res) {
  try {
    const { title, html } = req.body;
    const { profile, username } = req.user;
    const newpost = new Post({ title, html, postType: 'article', writter: profile._id });

    await newpost.save();
    res.status(201).json({message: 'Post - article is succefully created'})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'server error'})
  }
}

// <---------- CREATE QUESTION POST ---------->

async function createQuestionPost (req, res) {
  try {
    const { title, question } = req.body;
    const { profile, username } = req.user;

    if (!title || !question) {
      res.status(400).json({ message: 'bad request - title and question are required', status:400 });
    }
    
    if (title.length < 5 || title.length > 350 || question.length < 5 || question.length > 1400) {
      res.status(400).json({ message: 'title min 5 and max 350, question min 5 and max 1400', status:400 });
    }

    const newpost = new Post({ title, question, postType: 'question', writter: profile._id });

    await newpost.save();
    res.status(201).json({ message: 'Post - question is succefully created' });
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { getPosts, getPost, likePost, dislikePost, createPost, createArticlePost, createQuestionPost };
