import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';

// Page components
import HomePage from './views/HomePage.jsx';
import University from './views/University.jsx';
import Community from './views/Community.jsx';
import Role from './views/Role.jsx';
import Events from './views/Events.jsx';
import Settings from './views/Settings.jsx'
import LoginRegisterPage from './views/LoginRegisterPage.jsx';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>     
      <IndexRoute component={HomePage} />
      <Route path="auth" component={LoginRegisterPage} />
      <Route path="community" component={Community} />
      <Route path="university" component={University} />
      <Route path="role" component={Role} />
      <Route path="event" component={Events} />
      <Route path="settings" component={Settings} />
 
    </Route>
  </Router>,
  document.getElementById('root')
);