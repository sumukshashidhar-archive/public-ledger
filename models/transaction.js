var mongoose = require('mongoose')


var transactionSchema = new mongoose.Schema({
    Payee: String, 
    Payer: String, 
    Amount: String,
    mode: String,
    description: String
});

module.exports = mongoose.model("Transaction", transactionSchema);