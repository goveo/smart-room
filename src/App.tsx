import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { API_URL } from './app.config';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/authState';
import HomePage from './pages/Home/Home';
import setBaseUrl from './utils/setBaseUrl';
import Navbar from './components/Navbar';

setBaseUrl(API_URL);

const App: React.FC = () => {
  return (
    <AuthState>
      <Navbar />
      <Router>
        <div className="App">
          <Switch>
            {/* @NOTE: Change 'PrivateRoute' to 'Route' to remove login */}
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
