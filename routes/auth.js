const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    // After sign up, redirect to login
    res.redirect('/login.html');
  } catch (err) {
    res.status(500).send('Signup error');
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = user;
      // Redirect to index after login
      res.redirect('/');
    } else {
      res.send('Invalid credentials');
    }
  } catch (err) {
    res.status(500).send('Login error');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login.html');
});

module.exports = router;