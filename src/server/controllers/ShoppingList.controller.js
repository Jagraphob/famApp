var ShoppingList = require('../models/ShoppingList.model.js');

exports.get = function(req, res) {
    ShoppingList.find(function(err, list){        
        res.send(list);
    });
}

exports.create = function(req, res) {
    var entry = new ShoppingList({
        item: req.body.item,
        amount: req.body.amount,
        type: req.body.type,
        bought: req.body.bought,
    });

    entry.save();	
    res.sendStatus(200);
};

