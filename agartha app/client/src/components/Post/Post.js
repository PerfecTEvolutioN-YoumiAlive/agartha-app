import React, { useState } from 'react';
import { useStateValue } from '../../context/StateProvider';

import './Post.css';

import { LikeIcon } from '../../helpers/icons/Icons';

function Post(props) {
  const { createPost, author, category, title, content, createdAt, numOfLikes, numOfComments, numOfAnswers } = props;
  const { state } = useStateValue();
  const [inputState, setInputState] = useState({ title: 'asd', category: 'asda', content: 'asd' });

  return (
    createPost ? (
      state.authenticated && (
        <form className='createPost post'>
        <input 
          type='text' 
          placeholder='Category' 
          value={inputState.category}
          onChange={(e) => setInputState({ ...inputState, category: e.target.value })}
          className='post__inputCategory' />
        <input 
          type='text' 
          placeholder='Title' 
          value={inputState.title}
          onChange={(e) => setInputState({ ...inputState, title: e.target.value })}
          className='post__inputTitle' />
        <textarea 
          rows='7'
          placeholder='Content' 
          value={inputState.content}
          onChange={(e) => setInputState({ ...inputState, content: e.target.value })}
          className='post__inputContent' />
        <button 
          type='submit' 
          disabled={Object.values(inputState).some(val => val === '')}
          className={Object.values(inputState).some(val => val === '') && 'btn--disabled'}
        >POST</button>
      </form>
      )
    ) : (
      <div className='post'>
        <section className='post__header'>
          <div>
            <a href='#' className='post__author'>{author}</a>
            <p className='post__createdDate'>{createdAt}</p>
          </div>

          <p className='post__category'>{category}</p>
        </section>

        <section className='post__body'>
          <h2 className='post__title'>{title}</h2>
          <p className='post__content'>{content}</p>
        </section>

        <section className='post__footer'>
          <LikeIcon className='icon' />

          <div className='post__info'>
            <a href='#'>{numOfLikes > 1 ? `${numOfLikes} likes` : `${numOfLikes} like` }</a>
            <a href='#'>{numOfComments > 1 ? `${numOfComments} comments` : `${numOfComments} comment` }</a>
            {category === 'Question' && <a href='#'>{numOfAnswers > 1 ? `${numOfAnswers} answers` : `${numOfAnswers} answer` }</a>}
          </div>
        </section>
      </div>
    )
  )
}

export default Post;
