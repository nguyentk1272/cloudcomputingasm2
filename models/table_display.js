var pg_conn = require('./pg_config');

async function display_products(shop_id){
    const products_query =
    {
        text: 'SELECT * FROM products WHERE shop_id = $1',
        values: [shop_id]
    }
    const data = await pg_conn.query(products_query);
    //init the table_string, with the table tag
    let table_string =
    `<table border ='1'>
        <tr>`
    //display all headers of table
    let num_fileds = data.fields.length;
    for(let i=0; i < num_fileds; i++ ){
        table_string += `<th>${data.fields[i].name}</th>`
    };

        table_string += `</tr>`;
        //dispay all rows of table

    let num_rows = data.rowCount;
    console.log("num rows" + num_rows)
    for(let i=0; i<num_rows; i++){
        table_string += `<tr>`;
        for(let j=0; j<num_fileds; j++){
            let cell = data.rows[i][data.fields[j].name]
            table_string +=`<td>${cell}</td>`
        }
        table_string += `</tr>`
    }

        table_string += `</table>`;
        console.log("DATA: -->")
        console.log(data)
        return table_string
}
module.exports = display_products;