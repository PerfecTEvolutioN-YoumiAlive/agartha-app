const bcrypt = require('bcrypt');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');
const customID = require('custom-id');
const { nanoid } = require('nanoid');

const User = require('../../models/User/User');
const Online = require('../../models/User/Online');
const User = require('../../models/User/User');

// validation
// 1 if some information missing 
// 2 if email is not valid type 3) validate that firstname, lastname password have the correct legth
// after the first if of validation there is one more about if there is user with same email adress

function validateData(firstName, lastName, password) {
  if (firstName.length < 3 || lastName.length < 3) {
    return false;
  }

  if (lastName.length > 23 || lastName.length > 23) {
    return false;
  }

  if (password.length < 6 || password.length > 16) {
    return false;
  }

  return true;
}

function validateEmail(email) {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return true;
  } else {
    return false;
  }
}

function checkMethodLogin({ login }) {
  if (!isNaN(login)) {
    return 'phone';
  }
  
  if (validateEmail(login)) {
    return 'email';
  }

  return 'username';
}

const signToken = user => {
  return jwt.sign({
    iss: 'Team Project',
    sub: user
  }, 'private_key', { expiresIn: '169d' });
};

// <---------- HANDLE REGISTRATION CONTROLLER (POST) ---------->

async function handleRegistration(req, res) {
  const { email, firstName, lastName, password, isAccepted } = req.body;
  const oldUser = await User.findOne({ 'email': email }, { email: 1 });
  
  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ message: 'All fields required.', status: 400 })
  }
  
  if (!validateEmail(email)) {
    return res.status(200).json({ message: 'Enter valid email address.', status: 400 })
  }

  if (!isAccepted) {
    return res.status(200).json({ message: 'Not accepted rules', status: 400 });
  }
  
  if (oldUser){
    return res.status(200).json({ message: 'Email already in use', status: 400 })
  }

  const hashPassword = await bcrypt.hash(password, 8);
  const username = firstName + customID({ name: '123', email: '123', randomLength: 3 });
  const fullName = firstName + ' ' + lastName,

  const newuser = new User({ fullName, username, email, password: hashPassword, isAccepted });
  const newProfile = new Profile({ fullName, firstName, lastName, username, user: newuser._id });

  // TO CHECK THE PROCCESS - COMMENT THE SAVE() AND UPDATE() METHODS, AFTER THAT UNCOMMENT THE RES TO GET RES WITHOUT SAVE SMTH INTO THE DATABASE
  try {
    await newProfile.save();
    await newuser.save();
    await User.updateOne({ 'username': username }, { $set: { 'profile': newProfile._id }});

    const id = nanoid(8);
    const token = signToken({ user: {id: id, username: username }});
    const cookieEncrypted = cryptojs.AES.encrypt(token, id + 'teamproject-key').toString();
    const online = new Online({ user: newuser._id, cookie: cookieEncrypted, id: id });

    await online.save();

    res.status(201).json({ status: 201, message: 'Register has been succesfully finished', cookie: cookieEncrypted });

    // TEST RESPONSE res.status(200).json({username, hashPassword, newuser, newProfile, online, cookieEncrypted, token})
  } catch (err) {
    res.status(500).json(err);
  }  
}

// <---------- HANDLE LOGIN CONTROLLER (POST) ----------> 

async function handleLogin (req, res) {
  try {
    const { login, password } = req.body;

    const loginMethod = checkMethodLogin({ login }); // Check if the user login with username or phone number or email
    const user;

    if (loginMethod === 'username') {
      user = await User.findOne({ 'username': login }, { username: 1, email: 1, password: 1 });
    } else if (loginMethod === 'email') {
      user = await User.findOne({ 'email': login }, { username: 1, email: 1, password: 1 });
    }

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        const id = nanoid(8);
        const token = signToken({ user: { id: id, username: user.username }});
        const cookieEncrypted = cryptojs.AES.encrypt(token, id + 'teamproject-key').toString();

        const online = new Online({user: user._id, cookie: cookieEncrypted, id: id});
        await online.save();

        res.status(201).json({ status: 201, message: 'Login has been successfully finished', cookie: cookieEncrypted });
      } else {
        res.status(200).json({ status: 200, message: { msgBody: 'Wrong Password', msgError: false }});
      }
    }

    res.status(200).json({ status: 200, message: { msgBody: 'User not found', msgError: false }});
  } catch (err) {
    res.status(500).json(err);
  }
}

// <---------- HANDLE AUTHENTICATION CONTROLLER (GET) ---------->

async function handleAuthentication (req, res) {
  try {
    res.status(201).json({ message: 'Authenticated', user: {
      profile: req.user.profile,
      username: req.user.username,
      fullName: req.user.fullName,
      test: req.user.test,
      email: req.user.email,
      createdAt: req.user.createdAt,
      updateAt: req.user.updateAt
    }});
  } catch (err) {
    console.log(err);
  }
}

module.exports = { handleRegistration, handleLogin, handleAuthentication };