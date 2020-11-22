import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext, { UserCredentials } from './authContext';
import AuthReducer from './authReducer';

import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../types';

const AuthState = ({ children }: { children: any }): any => {
  const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const register = async (user: UserCredentials): Promise<any> => {
    try {
      const res = await axios.post('/auth/register  ', user);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data && res.data.data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.message || (error.response.data.errors[0] && error.response.data.errors[0].msg),
      });
    }
  };

  const login = async (user: UserCredentials): Promise<any> => {
    try {
      const res = await axios.post('/auth/login', user);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data && res.data.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        username: state.username,
        token: state.token,
        gestures: state.gestures,
        preferences: state.preferences,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
