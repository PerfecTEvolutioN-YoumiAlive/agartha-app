const express = require('express');
const router = express.Router();

const passport = require('../middlewares/HTTP/passport');

const { handleRegistration, handleLogin, handleAuthentication } = require('../controllers/accountController');
const { 
        getPosts,
        getPost,
        likePost,
        dislikePost,
        createPost, 
        createArticlePost, 
        createQuestionPost 
      } = require('../controllers/postController');
const { postValidation, articleValidation } = require('../validations/postValidation');

// TEST ROUTE
router.get('/auth', () => console.log('We are here'));


// ACCOUNT ROUTES
router.post('/signup', handleRegistration);
router.post('/signin', handleLogin);
router.get('/authentication', passport, handleAuthentication);

// POST ROUTES
router.post('/post/createPost', passport, postValidation, createPost)
router.post('/post/createArticle', passport, articleValidation, createArticlePost)
router.post('/post/createQuestion', passport, createQuestionPost)

router.get('/posts', getPosts)
router.get('/post/:_id', getPost)
router.put('/post-like/:_id', passport, likePost);
router.put('/post-dislike/:_id', passport, dislikePost);

module.exports = router;