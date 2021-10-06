let express = require('express');
let app = express();
const cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');



//middelware
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cookieParser());



//product number


var ProductNumber=0;

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
  

    ProductNumber=results[0].number;
});




connection.end();





//end Product numbre




app.get('/', function(req, res){
    
    res.render('./public/Home');
})


function DownloadData(results, res,des){

    let page = ProductNumber /10 ;

    // if( ProductNumber % 10 >0){
    //     page+=1;
    // }



    res.render('./public/ProductVitrine',{Products:results,Page:page,Des:des});


}


function GetDataProduct(res,d,f,des){
    

   var mysql      = require('mysql');
   var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'root',
     password : '12345',
     database : 'Asre9niStore'
   });
    

 
   connection.connect();
   
   console.log('select idProduct,Nom_Product,Price,Image,Describe_Product,P.idCategory,CatName,P.idBrand, BrandName from Product P join Brand B join Category C on P.idCategory= C.idCategory and P.idBrand=B.idBrand  limit '+d+','+f+'')
   
   connection.query('select idProduct,Nom_Product,Price,Image,Describe_Product,P.idCategory,CatName,P.idBrand, BrandName from Product P join Brand B join Category C on P.idCategory= C.idCategory and P.idBrand=B.idBrand  limit '+d+','+f+'', function (error, results, fields) {
       if (error) throw error;
   
   
       DownloadData(results,res,des);
   
   });
   
   
   
   connection.end();
   
   
   
}


app.get('/Product', function(req,res){

    //mysql
   // var 

   res.redirect("/Product/Page=0")
   





})

app.get('/Product/Page=:num',function(req,res){


    var d = (req.params.num)* 10 ;
    var f= d+9;
   
    
    console.log(d +" , ,"+f );

    GetDataProduct(res,d,f,req.query.num);

})


app.get('/ProductTest',(req,res)=>{
    res.render('./public/Product/Test');
});



function resCategoryProduct(res,results,page){

    let d= page*10;
    let f= d+9;
    let nbr;

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '12345',
      database : 'Asre9niStore'
    });
     
    connection.connect();
    
    


    
    connection.query(" select cout(*) as number from Product P join Brand B join Category C on P.idCategory= C.idCategory or P.idBrand=B.idBrand and CatName='"+Category+"'  ", function (error, results, fields) {
        if (error) throw error;
      
    let nbr= results[0].number;

        let nbrPage = nbr/10;

        res.render('./public/ProductVitrine',{Products:results,Page:nbr,Des:page})
    

    
    });

    
    connection.end();

}

function GetCategory(res,Category,page){


    let d= page*10;
    let f= d+9;
    let nbr;

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '12345',
      database : 'Asre9niStore'
    });
     
    connection.connect();
    
    


    connection.query(" select idProduct,Nom_Product,Price,Image,Describe_Product,P.idCategory,CatName,P.idBrand, BrandName from Product P join Brand B join Category C on P.idCategory= C.idCategory or P.idBrand=B.idBrand and CatName='"+Category+"'  limit "+d+","+f+" ", function (error, results, fields) {
        if (error) throw error;
      
        resCategoryProduct(res,results,page);
    

    
    });
    
    
    
    
    connection.end();
    
}


app.get("/Product/Page=:num/Category=:Category",(req,res)=>{

    let num=req.params.num;
    let category=req.params.Category;


    
     
});


function GetCategoryBrand(res,Category,Brand,page){

}

app.get("/Product/Page=:num/Category=:Category/Brand=:Brand",(req,res)=>{

    let num=req.params.num;
    let category=req.params.Category;
    let brand=req.params.Brand;
    


     
});


app.listen(8080);

