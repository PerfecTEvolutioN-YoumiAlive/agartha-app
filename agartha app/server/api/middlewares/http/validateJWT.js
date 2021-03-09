const jwt = require('jsonwebtoken');

function validateJWT(token) {
  try {
    var decoded = jwt.verify(token, 'private_key');
    return decoded;
  } catch (err) {
    console.log('there is and error on validation');
    return '';
  }
}

module.exports = validateJWT;