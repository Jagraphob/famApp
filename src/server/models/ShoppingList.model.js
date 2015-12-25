var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shoppingListSchema = new Schema({
    item: String,
    type: String,    
    amount: Number,	
    unit: String,
    remark: String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);