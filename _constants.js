// TOD0:switch API_URL between development and production
let dev = process.env.NODE_ENV !== 'production';
export const make_url = (domain, protocol = 'http', secure = false) => {
  let reqProtocol = protocol;
  if (secure) reqProtocol = reqProtocol + 's'
  return `${reqProtocol}://${domain}`
}

export const API_URL = dev ? make_url('127.0.0.1:8000') :
  make_url('m-subscribe-api.herokuapp.com', 'http', true);

export const GRAPHQL_ENDPOINT = `${API_URL}/graph_ql`;

export const API_WS_URL = dev ? make_url('127.0.0.1:8000', 'ws') :
  make_url('m-subscribe-api.herokuapp.com', 'ws', true);

export const GRAPHQL_WS_ENDPOINT = `${API_WS_URL}/ws/graph_ql`

/******************************
 * AUTH API ENDPOINTS
 ******************************/
export const LOGIN_URL = `${API_URL}/accounts/login/`;

export const LOGOUT_URL = `${API_URL}/accounts/logout/`;

export const REGISTER_URL = `${API_URL}/accounts/registration/`;

/******************************
 * SOCIAL LOGIN CLIENT IDS
 ******************************/

export const GOOGLE_CONFIG = {
  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  scope: 'openid ' +
         'https://www.googleapis.com/auth/userinfo.profile ' +
         'https://www.googleapis.com/auth/userinfo.email '
};

export const GOOGLE_LOGIN_URL = `${API_URL}/accounts/social/google/`;
