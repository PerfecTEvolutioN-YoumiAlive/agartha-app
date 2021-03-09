import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Axios from '../axiosConfig';
import './SignIn.css';

function SignIn() {
  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const [loginStatus, setLoginStatus] = useState('LOGGED OUT');
  const [authStatus, setAuthStatus] = useState('NOT AUTHENTICATE');

  const signin = (e) => {
    e.preventDefault();

    Axios.post('/accounts/signin', {
      username: input.username,
      password: input.password,
      withCredentials: true
    },
    {
      withCredentials: true
    }).then(res => { 
      if (res.data.loginStatus) {
        localStorage.setItem('token', `Bearer ${res.data.token}`);
        setLoginStatus('LOGGED IN');
      }
    });

    setInput({ username: '', password: '' });
  };

  const userAuth = () => {
    Axios.get('/accounts/auth', {
      headers: {
        'authorization': localStorage.getItem('token')
      }
    }).then(res => {
      setAuthStatus('AUTHENTICATED');
    });
  };

  useEffect(() => {
    Axios.get('/accounts/signin', { withCredentials: true }).then(res => {
      if (res.data.loggedIn) {
        console.log('Cookie -->', res.data.result);
        setLoginStatus('LOGGED IN');
      }
    });
  }, []);

  return (
    <div className='signIn'>
      <h1>Sign In</h1>
      <p>{loginStatus} - {authStatus}</p>
      <button onClick={userAuth}>Auth Check</button>

      <form onSubmit={(e) => signin(e)}>
        <div>
          <div>
            <label htmlFor='username'>Username:</label>
            <input 
              type='text' 
              name='username' 
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor='password'>Password:</label>
            <input 
              type='password' 
              name='password' 
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </div>

          <button type='submit'>Sign In</button>
        </div>
      </form>

      <div className='signIn__footer'>
        <Link to='/#'>
          Forgot Password
        </Link>

        <Link to='/signup'>
          <button>Sign Up</button>
        </Link>
        </div>
    </div>
  );
}

export default SignIn;
