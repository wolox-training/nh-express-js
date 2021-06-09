exports.serializeUser = user => ({
  name: user.name,
  last_name: user.last_name,
  email: user.email
});
