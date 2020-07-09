import cookie from 'js-cookie'

export const login = token => {
  // set token cookie
  cookie.set('token', token, {expires: 2});
  window.location = "/"
};

export default {
  logout: async (obj, args, {cache}, info) => {
    cookie.remove('token');
    // return null
    return null;
  }
}