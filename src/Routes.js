import React from 'react';
import * as serviceWorker from './serviceWorker';
import App from './App';

import CardRegisterStyle from './Components/RegisterForm/SignUpStyle';
import CardLoginForm from './Components/LoginForm/LoginFormStyle';
import { Route, Router, Switch, HashRouter } from 'react-router-dom';
import MainHelpPage from './HelpPages/MainHelpPage';
import profile from './Profile/profile';
import NotFound from './notfound';
import CreateEvent from './CreateEvent/index';

import store from './store';
import history from './history';

// Private-Protected Route function
import PrivateRoute from './PrivateRoute';

import { Provider } from 'react-redux';
import Success from './CreateEvent/success';
import SettingsMainPage from './Settings/settings';
import Account from './Settings/account/account';
import Security from './Settings/security/security';
import Events from './Events/Events';
import DataDisplay from './Events/Layout/DataDisplay';
import MusicPage from './Events/Event-SubPages/MusicPage';
import resetPasswordPage from './Components/ResetPassword/resetPass';
import SportsPage from './Events/Event-SubPages/SportsPage';
import EnterPage from './Events/Event-SubPages/EnterPage';

import { useDispatch } from 'react-redux';
import setAuthorizationToken, {
  getUser,
} from './store/modules/auth/actions/authActions';
import { SET_CURRENT_USER } from './store/modules/auth/authTypes';

const Routes = () => {
  const dispatch = useDispatch();
  if (localStorage.token) {
    setAuthorizationToken(localStorage.token);

    dispatch(getUser());
    store.dispatch({ type: SET_CURRENT_USER });
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={CardLoginForm} />
        <Route path="/register" component={CardRegisterStyle} />
        <Route path="/help" component={MainHelpPage} />
        <Route path="/reset-password" component={resetPasswordPage} />

        {/* Route path Profile  */}
        <PrivateRoute exact path="/profile" component={profile} />
        <PrivateRoute exact path="/create-event" component={CreateEvent} />
        <PrivateRoute exact path="/event-success" component={Success} />

        {/* Settings Routes */}
        <PrivateRoute exact path="/settings/:id" component={SettingsMainPage} />
        <PrivateRoute exact path="/account/:id" component={Account} />
        <PrivateRoute exact path="/security/:id" component={Security} />

        {/* Event-Tabs */}
        <Route path="/events" component={MusicPage} />
        <Route path="/events/:id" component={DataDisplay} />

        {/* Event-Types Routes */}
        <Route path="/music" component={MusicPage} />
        <Route path="/sports" component={SportsPage} />
        <Route path="/entertainment" component={EnterPage} />
        <Route path="/cinema" component={EnterPage} />
        <Route path="/dance" component={EnterPage} />
        <Route path="/arts" component={EnterPage} />
        <Route path="/kids" component={EnterPage} />
        <Route path="/social_events" component={EnterPage} />

        {/* Not Found route 404*/}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;