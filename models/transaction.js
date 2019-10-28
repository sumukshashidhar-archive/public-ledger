var mongoose = require('mongoose')


var transactionSchema = new mongoose.Schema({
    Payee: String, 
    Payer: String, 
    Amount: String,
});

module.exports = mongoose.model("Transaction", transactionSchema);