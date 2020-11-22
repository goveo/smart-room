import axios from 'axios';

export default (baseUrl: string): string => (axios.defaults.baseURL = baseUrl);
