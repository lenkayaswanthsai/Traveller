require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/form');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "public", "css", "style.css")));
app.use(session({
  secret: process.env.SESSION_SECRET || 'myverysecuresecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'));

app.use('/', authRoutes);
app.use('/', formRoutes);

app.get('/', (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  } else {
    res.redirect('/login.html');
  }
});


app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});


app.get('/form.html', (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'views', 'form.html'));
  } else {
    res.redirect('/login.html');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});