import cookie from 'js-cookie'

export const login = (token, redirectUrl) => {
  // set token cookie
  cookie.set('token', token, {expires: 2});
  if (!redirectUrl)
    window.location = "/"
  else
    window.location = redirectUrl
};

export default {
  logout: async (obj, args, {cache}, info) => {
    cookie.remove('token');
    // return null
    return null;
  }
}