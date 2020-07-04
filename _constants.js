// TOD0:switch API_URL between development and production
const dev = process.env.NODE_ENV !== 'production';
export const API_URL =  dev ? 'http://127.0.0.1:8000' : 'https://api-voting.herokuapp.com';

export const GRAPHQL_ENDPOINT = `${API_URL}/graph_ql`;
/******************************
 * AUTH API ENDPOINTS
 ******************************/
export const LOGIN_URL = `${API_URL}/accounts/login/`;

export const LOGOUT_URL = `${API_URL}/accounts/logout/`;

export const REGISTER_URL = `${API_URL}/accounts/registration/`;

/******************************
 * SOCIAL LOGIN CLIENT IDS
 ******************************/

export const CLIENT_IDS = {
  google: '934662047815-n7tknpd3tq3g7uc6fmqmmqssj8rudmm3.apps.googleusercontent.com'
};

export const GOOGLE_LOGIN_URL = `${API_URL}/accounts/social/google/`;
