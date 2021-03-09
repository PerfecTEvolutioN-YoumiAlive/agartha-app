import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../context/reducer';
// import Axios from '../../axiosConfig';

import './Sidebar.css'
import SignIn from './Signin';

function Sidebar() {
  const {state, dispatch} = useStateValue();

  // useEffect(() => {
  //   Axios.get('/accounts/signin', { withCredentials: true })
  //   .then(res => {
  //     if (res.data.loginStatus) {
  //       dispatch({
  //         type: actionTypes.INIT,
  //         user: res.data.result
  //       });
  //     }
  //   });
  // }, []);

  console.log('state -->', state);

  return (
    <div className='sidebar'>
      {state.authenticated ? (
        <div>
          <h1>Logged In</h1>
        </div>
      ) : (
        <Router>
          <Switch>
            <Route exact path='/'>
              <SignIn />
            </Route>

            <Route path='/signin'>
              <SignIn />
            </Route>

            <Route exact path='/signup'>
              <h1>Sign Up</h1>
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default Sidebar;
