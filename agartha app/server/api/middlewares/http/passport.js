const Online = require('../../models/User/Online');
const User = require('../../models/User/User');

const validateJWT = require('./validateJWT');
const cryptojs = require('crypto-js');

async function passport(req, res, next) {
  try {
    const cookie = req.headers['authorization'];
    const onlineUser = await Online.findOne({ 'cookie': cookie });

    if (onlineUser) {
      const encryptedKey = onlineUser.id + 'teamproject-key';

      try {
        const decryptedCookieJWT = cryptojs.AES.decrypt(cookie, encryptedKey).toString(cryptojs.enc.Utf8);
        const validate = ValidateJWT(decryptedCookieJWT);

        if (validate !== '') {
          const user = await User.findOne({ 'username': validate.sub.user.username }).populate('profile');
          req.user = user;
          next();
        }

        res.status(200).json({ message: { msgBody: 'Need to login again', msgError: true }});
      } catch (err) {
        res.status(500).json(err);
      }
    }

    res.status(200).json({ message: { msgBody: 'Need to login again', msgError: true }});
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = passport;