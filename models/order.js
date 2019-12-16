const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerName: String,
    phoneNumber: String,
    address: String,
    pizzaSize:String,
    typeOfCrust:String,
    toppings:[String],
    quantity:Number,
    price:Number,
    createdOn:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Order', orderSchema);