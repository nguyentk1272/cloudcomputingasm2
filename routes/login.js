var express = require('express');
var router = express.Router();
var authen = require('../models/authenticator');
var getTable = require('../models/table_display');
var gen_box = require('../models/select_box');
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('login', { title: 'ATN SHOP', message: 'PLEASE Input username or password' });
});

router.post('/', async function(req, res, next) {
let username = req.body.username;
let password = req.body.password;
let [authenticated, shop_id, role] = await authen(username, password)
console.log(authenticated, shop_id, role)
//show user page
if (authenticated == true & role == 'shop') {
  var table = await getTable(shop_id)

  res.render('users', { title: 'Welcome to ATN SHOP',
                        name: username,
                        table_string: table});
}
//show admin page
else if (authenticated == true & role == 'admin') {
  let box_string = await gen_box();
  res.render('admin', {
    title: 'Welcome to Admin page of ATN-SHOP',
    name: username,
    select_box: box_string,
    // table_string: table,
  });
}
else {
  res.render('login', { title: 'ATN SHOP',
                        message: 'Wrong username or password. Please try again!'});
}
});

module.exports = router;
