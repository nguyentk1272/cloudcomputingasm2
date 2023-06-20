var express = require('express');
var session = require('express-session');
var router = express.Router();

// assets and components and models
const authenticate = require('../models/authentication');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ATN shop' });
});

// navigator for login page
router.post('/', (req, res, next) => {
  res.render('login', {title: 'Login', 
  message: 'Please enter your username and password'});
});


// Login
router.post('/login', async (req, res, next) => {
  // get value from body
  let username = req.body.username;
  let password = req.body.password;
  session = req.session;

  // log username and password to console
  console.log(username, password);

  let [authenticated, shop_id, role] = await authenticate(username, password);
  console.log(await authenticate(username, password));

  // if authenticated true then redirect to admin page
  if (authenticated == true && role == 'admin') {
      // assign session
      session.user_id = username;
      session.shop_id = shop_id;
      session.role = role;
      // redirect
      res.redirect('/admin');
  }

  // else if redirect to users
  else if (authenticated == true && role == 'shop') {
    // assign session
      session.user_id = username;
      session.shop_id = shop_id;
      session.role = role;
      // redirect
      res.redirect('/users');
  }

  // else redirect to login page
  else {
      res.render('login', {
        title: 'ATN SHOP',
        message: 'Username or password incorrect! Please try again'
      })
  }

});

// logout
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.render('index', {title: 'ATN SHOP'});
})



module.exports = router;
