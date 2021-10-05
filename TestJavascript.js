
function test(results){

  console.log(results[0].number)

}


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'Asre9niStore'
});
 
connection.connect();


connection.query(' select count(*) as number from Product', function (error, results, fields) {
    if (error) throw error;
  
    test(results);

    let number=results[0].number;
});




connection.end();


