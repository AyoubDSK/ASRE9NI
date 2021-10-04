var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'Asre9niStore'
});
 
connection.connect();


connection.query('select idProduct,Nom_Product,Price,Image,Describe_Product,P.idCategory,CatName,P.idBrand, BrandName from Product P join Brand B join Category C on P.idCategory= C.idCategory or P.idBrand=B.idBrand group by Nom_Product', function (error, results, fields) {
    if (error) throw error;
  
    console.log(results)

});



connection.end();