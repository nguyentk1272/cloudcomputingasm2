var express = require('express');
const gen_box = require('../models/select_box');
var display_products = require('../models/table_display');
var router = express.Router();


var session;
/* GET admin page. */
router.get('/', async (req, res, next) => {
  session = req.session;
  let shop_id = session.shop_id;
  let username = session.user_id;

  // calling display products
  let table = await display_products(shop_id);
  // select box string
  let select_box = await gen_box();

  res.render('admin', {
    title: 'Admin',
    name: username,
    table_str: table,
    select_box_str: select_box,});
});

router.post('/select_box', async (req, res, next) => {
  let shop_id = req.body.shops;
  console.log(req.body.shops);
  let username = req.session.user_id;
  let table = await display_products(shop_id);
  let box_str = await gen_box();
  res.render('admin', {
    title: 'Admin',
    name: username,
    select_box_str: box_str,
    table_str: table,
  })
})

module.exports = router;

