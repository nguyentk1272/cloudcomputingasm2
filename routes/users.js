var express = require('express');
const crud = require('../models/crud');
const display_products = require('../models/table_display');
var router = express.Router();
var session;

/* GET users listing. */
router.get('/', async (req, res, next) => {
  session = req.session;
  if (session.user_id) {
    let username = session.user_id;
    let shop_id = session.shop_id;
    let table = await display_products(shop_id);

    res.render('users', {title: 'Welcome user to ATN shop',
                         name: username,
                         table_string: table});
  }
  else {
    res.render('login', {title: 'ATN SHOP',
  message: 'Please login'})
  }

});

router.post('/crud', async (req, res, next) => {
  try {
    session = req.session;
    console.log(req.body);
    

    // refresh the page
    let table = await display_products(req.body.shop_id);
    res.render('users', {
      title: 'Welcome user to ATN shop',
      name: session.user_id,
      table_string: table
  });
  } catch (error) {
      console.error(error.message)
  }

});



module.exports = router;
