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






app.get('/', async function(req, res){
    res.render('home')
})

app.get('/transaction', async function(req, res){
    res.render('trans')
})
  
app.post('/transaction', async function(req, res){
    var newTransaction = new tc({
        Payee: req.body.payee,
        Payer: req.body.payer,
        Amount: req.body.Amount
    })

    newTransaction.save(function(err, obj){
        if(err){
            console.log(err)
        }
        else{
            console.log(obj)
        }
    })
})