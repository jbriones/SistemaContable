const jwt = require('jsonwebtoken');

exports.create = (user) => {
  const token = jwt.sign(user, process.env.OAUTH_SECRET_TOKEN, {
    expiresIn: process.env.OAUTH_SECRET_TOKEN_EXPIRE_IN,
  });

  return token;
};

exports.verify = token => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.OAUTH_SECRET_TOKEN, (err, user) => {
    if (err) reject(err);
    resolve(user);
  });
});
