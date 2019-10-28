var express = require('express')
var fs = require('fs');
var bcrypt = require('bcrypt')
var tc = require('./models/transaction.js')
var bodyParser = require("body-parser");
var mongoose = require('mongoose')
var app = express();
var db = require('./config/db')
var serv = require('./config/serve')
const cors =require('cors');
var user = require('./models/user')

app.use(cors());
mongoose.Promise = global.Promise; 
app.use(bodyParser.json());

/* 
I will work on everything later, first I want to create a ledger software which can allow me to add lines into it

*/

app.listen(serv.port, process.env.IP, function(req, res) //The Serv.port is from a config file
{
    console.log("SERVER STARTED");
});

app.use(express.static("styles"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect(db.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true}) //Changed this line to link to a database file instead of having everything in one file to provide quick and easy access for further work
    .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



function authCheck(){
    return false;
}


app.get('/login', async function(req, res){
    res.render('login')
})

app.post('/login', async function(req, res){
    user.findOne({username: req.body.username}, function(err, obj){
        if(err){
            console.log(err)
        }
        else{
            console.log("Inside comparison")
            if(bcrypt.compareSync(req.body.password, obj["password"])){
                console.log(obj)
                res.render('home', {user: obj})
            }
            else{
                console.log("Password Error")
            }
        }
    })
})

app.post('/register', async function(req, res){
    var newUser = new user({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 9)
    })

    newUser.save(function(err, obj){
        if(err){
            console.log(err)
        }
        else{
            res.redirect('login')
            console.log(obj)
        }
    })
})

app.get('/register', async function(req, res){
    res.render('register')
})


app.get('/', async function(req, res){
    res.render('home', {user: obj})
})

app.get('/transaction', async function(req, res){
    tc.find({hidden: false}, function(err, obj){
        res.render('trans', {data: obj})
    })
    
})
  
app.post('/transaction', async function(req, res){
    console.log(req.body.hidden)
    if(req.body.hidden=="on"){
        bool = true
    }
    else{
        bool = false
    }
    var newTransaction = new tc({
        Payee: req.body.payee,
        Payer: req.body.payer,
        Amount: req.body.Amount,
        hidden: bool
    })

    newTransaction.save(function(err, obj){
        if(err){
            console.log(err)
        }
        else{
            console.log(obj)
            res.redirect('/transaction')
        }
    })
})