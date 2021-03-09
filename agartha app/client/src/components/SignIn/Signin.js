import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../context/reducer';
import Axios from '../../any/AxiosConfig';

import './SignIn.css'
import { AgarthaLogo } from '../../helpers/icons/Icons';

function SignIn() {
  const { state, dispatch } = useStateValue();
  const [input, setInput] = useState({ username: '', password: '' });

  const handleSignin = (e) => {
    e.preventDefault();

    Axios.post('/accounts/signin', {
      username: input.username,
      password: input.password,
      withCredentials: true
    },
    {
      withCredentials: true
    })
    .then(res => { 
      if (res.data.loginStatus) {
        localStorage.setItem('token', `Bearer ${res.data.token}`);
        dispatch({
          type: actionTypes.INIT,
          user: res.data.result
        });
      }
    });

    setInput({ username: '', password: '' });
  };

  return (
    <section className='signin'>
      <div className='signin__brand'>
        <AgarthaLogo className='icon' />
        <h1>AGARTHA</h1>
      </div>
      
      <form onSubmit={(e) => handleSignin(e)} className='signin__form'>
        <div className='signin__formHeader'>
          <h2>SIGNIN</h2>
          <p>By continuing, you agree to our User Agreement and Privacy Policy</p>
        </div>

        <div className='signin__formBody'>
          <input 
            placeholder='Username'
            type='text' 
            value={input.username} 
            onChange={(e) => setInput({ ...input, username: e.target.value })}
          />
          <input 
            placeholder='Password'
            type='password' 
            value={input.password} 
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <button type='submit'>SIGN IN</button>
          <a href='#'>Forgot your password?</a>
        </div>

        <div className='signin__formFooter'>
          <div>
            <hr/>
            <p>OR</p>
            <hr/>
          </div>

          <Link to='/signup'>CONTINUE WITH GOOGLE</Link>
        </div>
      </form>
    </section>
  );
}

export default SignIn;
