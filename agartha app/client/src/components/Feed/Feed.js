import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../context/reducer';

import Leaderboard from '../Leaderboard/Leaderboad';
import Post from '../Post/Post';

import './Feed.css'

function Feed() {
  const {state, dispatch} = useStateValue();
  const [posts, setPosts] = useState([
    {
      id: 0,
      category: 'Article',
      username: 'sonnyparker',
      title: 'Elon Musk becomes world\'s richest person as wealth tops $185bn',
      content: 'The Tesla and SpaceX entrpreneur was purchased into the top slot after Tesla\'s share price increased on Thursday. He takes the top spot from Amazon founder Jeff Bezos, who had held since 2017. Mr Musk\'s electric car company. Tesla has surged in value this year, and hit a market value of $700bn for the first time on Wednesday.',
      createdAt: 'Monday, 8 March 2021',
      numOfLikes: 5,
      numOfComments: 2,
    },
    {
      id: 1,
      category: 'Question',
      username: 'devmamba',
      title: 'Anybody wants to be my learning buddy?',
      content: 'I\'m a front-end developer, I believe I\'m good at CSS and Javascript but since I usually try to find remote work(I work alone), sometimes it\'s hard to deal with stuff that you\'re not really good at. An is Git and Linux. These things are not so easy for me and it would be awesome to have friends who I can call for trivial stuff and they too can ask help from me on stuff I am good at. It\'s a win-win + more wins.',
      createdAt: 'Monday, 8 March 2021',
      numOfLikes: 1,
      numOfComments: 12,
      numOfAnswers: 2,
    },
    {
      id: 2,
      category: 'Question',
      username: 'slammer',
      title: 'What should I learn python or node.js for web development?',
      content: 'I am thinking to start learning web development but was confused which back end technology should I use? Python or NodeJS. I already know python so I was thinking to learn web development using it but came to know that NodeJS is also very popular these days and it also has some advantages over Python.',
      createdAt: 'Monday, 8 March 2021',
      numOfLikes: 1,
      numOfComments: 4,
      numOfAnswers: 3
    }
  ]);
  
  return (
    <div className='feed'>
      <section className='feed__posts'>
        <Post createPost />
        {posts.map(post => (
          <Post 
            key={post.id}
            author={post.username}
            category={post.category}
            title={post.title} 
            content={post.content} 
            createdAt={post.createdAt}
            numOfLikes={post.numOfLikes}
            numOfComments={post.numOfComments}
            numOfAnswers={post?.numOfAnswers}
        />
        ))}
      </section>

      <Leaderboard />
    </div>
  );
}

export default Feed;
