import React from 'react';
import Header from './components/Header';
import './App.css';
import { AuthRoute, ProtectedRoute } from './util/route_util';
import { Switch } from 'react-router-dom';
// import LoginFormContainer from './components/session/login_form_container';
import SignupFormContainer from './components/session/signup_form_container';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}

      <Switch>
        <AuthRoute exact path="/" component={Header} />
        {/* <AuthRoute exact path="/login" component={LoginFormContainer} /> */}
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
      </Switch>


    </div>
  );
}

export default App;
