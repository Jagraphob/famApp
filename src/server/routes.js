var router = require('express').Router();

var shoppingListCtrl = require('./controllers/ShoppingList.controller');


router.get('/shoppinglist', getShoppingList);
router.post('/newshoppingitem', postShoppingItem);


module.exports = router;

/////////////////////////////////////////////////////////////////////////

function postShoppingItem(req, res, next) {
    return shoppingListCtrl.create(req, res);
}

function getShoppingList(req, res, next) {
    return shoppingListCtrl.get(req, res);
}