import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Axios from '../axiosConfig';

import './SignUp.css';

function SignUp() {
  const [input, setInput] = useState({
    name: '',
    username: '',
    password: ''
  });

  Axios.defaults.withCredentials = true;

  const signup = (e) => {
    e.preventDefault();
    
    Axios.post('/accounts/signup', {
      name: input.name,
      username: input.username,
      password: input.password
    }).then(res => console.log(res));

    setInput({ name: '', username: '', password: '' });
  };

  return (
    <div>
      <div className="signUp">
        <h1>Sign Up</h1>

        <form onSubmit={(e) => signup(e)}>
          <div>
            <div>
              <label htmlFor="name">Full Name:</label>
              <input 
                type="text" 
                name="name"
                onChange={(e) => setInput({ ...input, name: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="username">Username:</label>
              <input 
                type="text" 
                name="username"
                onChange={(e) => setInput({ ...input, username: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                name="password"
                onChange={(e) => setInput({ ...input, password: e.target.value })}
              />
            </div>

            <button type='submit'>Sign Up</button>
          </div>
        </form>

        <div className="signUp__footer">
          <p>Already have an account? Then <Link to="/signin">sign in</Link>.</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
