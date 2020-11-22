import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { API_URL } from './app.config';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Register from './components/pages/Register';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/authState';
import HomePage from './pages/Home/Home';
import setBaseUrl from './utils/setBaseUrl';

setBaseUrl(API_URL);

const App: React.FC = () => {
  return (
    <AuthState>
      <Router>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/" component={HomePage}></PrivateRoute>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/logout" component={Logout}></Route>
            <Route exact path="/register" component={Register}></Route>
            {/* <PrivateRoute path="" component={NotFound} /> */}
          </Switch>
        </div>
      </Router>
    </AuthState>
  );
};
export default App;
