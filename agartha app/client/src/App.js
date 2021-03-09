import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Feed from './components/Feed/Feed';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/Signin';

function App() {
  return (
    <div className='app'>
      <section className='app__container'>
        <header className='app__header'>
          <Navigation />
        </header>

        <div className="app__body">
          <Router>
            <Switch>
              <Route exact path='/'>
                <Feed />
              </Route>

              <Route path='/home'>
                <Feed />
              </Route>

              <Route path='/signin'>
                <SignIn />
              </Route>

              <Route exact path='/signup'>
                <h1>Sign Up</h1>
              </Route>
            </Switch>
          </Router>
        </div>
      </section>
    </div>
  );
}

export default App;
