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

app.get('/', function(req, res){
    
    res.render('./public/Home');
})


app.get('/Product', function(req,res){

    //mysql
   // var 
    res.render('./public/ProductVitrine');

})

app.get('/ProductTest',(req,res)=>{
    res.render('./public/Product/Test');
});

app.listen(8080);

