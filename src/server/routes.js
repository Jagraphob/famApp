var router = require('express').Router();

var shoppingListCtrl = require('./controllers/ShoppingList.controller');


router.get('/shoppinglist', getShoppingList);
router.post('/newshoppingitem', postShoppingItem);


module.exports = router;

/////////////////////////////////////////////////////////////////////////
function getShoppingList(req, res) {
    return shoppingListCtrl.get(req, res);
}

function postShoppingItem(req, res) {
    return shoppingListCtrl.create(req, res);
}

