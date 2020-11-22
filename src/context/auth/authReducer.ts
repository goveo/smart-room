import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../types';
import { AuthState } from './authContext';

export default (state: AuthState, action: any): any => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        username: null,
        token: null,
        gestures: [],
        preferences: [],
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    default:
      break;
  }
};
