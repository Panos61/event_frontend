import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CardRegisterStyle from './Components/RegisterForm/SignUpStyle';
import CardLoginForm from './Components/LoginForm/LoginFormStyle';
import { Route, Router, Switch } from 'react-router-dom';
import MainHelpPage from './HelpPages/MainHelpPage';
import profile from './Profile/profile';
import NotFound from './notfound';
import CreateEvent from './CreateEvent/index';

import store from './store';
import history from './history';

// Private-Protected Route function
import PrivateRoute from './PrivateRoute';

import { Provider } from 'react-redux';
import { LOGIN_SUCCESS } from './store/modules/auth/authTypes';
import Security from './Profile/Security/security';
import Success from './CreateEvent/success';

// Event-Tabs
import MusicTab from './Events/music';
import AuthEvents from './CreateEvent/AuthEvents';

import setAuthorizationToken from './store/modules/auth/actions/authActions';

//when the page reloads, the auth user is still set
if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  let userData =
    localStorage.getItem('user_data') == null
      ? null
      : JSON.parse(localStorage.getItem('user_data'));
  store.dispatch({ type: LOGIN_SUCCESS, payload: userData }); //provided he has a valid token
}

//Added basic Routing for Login/Register/..
const routing = (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={CardLoginForm} />
        <Route path="/register" component={CardRegisterStyle} />
        <Route path="/help" component={MainHelpPage} />
        {/* Route path Profile  */}
        <PrivateRoute exact path="/profile" component={profile} />
        <Route exact path="/create-event" component={CreateEvent} />
        <PrivateRoute exact path="/event-success" component={Success} />
        <PrivateRoute exact path="/security" component={Security} />

        {/* Event-Tabs */}
        <Route path="/events" component={AuthEvents} />

        {/* Not Found route 404*/}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
