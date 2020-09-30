import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Landing from './components/Landing';
import Signup from './components/SIgnup/Signup';
import Login from './components/Login/Login';
import Alert from './components/Alert';

//redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken  from './utils/setAuthToken';

import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {

  useEffect(()=>{
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Nav/>
          <section className="container">
            <Alert/>
            <Switch>
              <Route path="/" exact component={Landing}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
