var pg_conn = require('./pg_config');

async function crud(req_body) {
  let id = req_body.id;
  let product_name = req_body.name;
  let price = req_body.price;
  let quantity = req_body.quantity;
  let shop_id = req_body.shop_id;

  // update case
  if (req_body.crud == "update") {
    var query = {
      text: `UPDATE products
                SET name = $2,
                price = $3,
                quantity = $4
                WHERE id = $1;`,
      values: [id, product_name, price, quantity],
    };
  }
  // delete case
  else if (req_body.crud == "delete") {
    var query = {
      text: `DELETE FROM products WHERE id = $1;`,
      values: [id],
    };
  }
  // insert case
  else {
    var query = {
      text: `INSERT INTO products
                (name, price, quantity, shop_id)
                VALUES ($1, $2, $3, $4);`,
      values: [product_name, price, quantity, shop_id],
    };
  }

  // then query to db
  console.log(query);
  results = await pg_conn.query(query);
}

module.exports = crud;
