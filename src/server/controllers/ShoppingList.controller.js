var ShoppingList = require('../models/ShoppingList.model.js');

//  api/shoppinglist
exports.get = function(req, res) {
    ShoppingList.find(function(err, list){        
        res.send(list);
    });
};

//  api/newshoppingitem
exports.create = function(req, res) {
    
    var entry = new ShoppingList({
        item: req.body.item,
        type: req.body.type,        
        amount: req.body.amount,
        unit: req.body.unit,
        remark: req.body.remark
    });
    
    entry.save(function (err,post){
        if(err)
            console.log(err);
        res.json(201, post);
    });	
    
};

exports.delete = function(req, res) {
  
    ShoppingList.findById(req.params.id, function(err,docs){
        if(err)
            return console.log(err);                
    }).remove().exec();
    res.sendStatus(200);    
};