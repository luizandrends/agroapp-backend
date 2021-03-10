export default {
  jwt: {
    secret: process.env.APP_SECRET || 'JWTSECRET',
    expiresIn: '1d',
  },
};
