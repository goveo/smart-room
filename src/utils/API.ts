import axios from 'axios';
import { API_URL } from '../app.config';

export default axios.create({
  baseURL: API_URL,
  responseType: 'json',
});
