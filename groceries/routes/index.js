var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');


router.param('product', function(req, res, next, id) {
  var query = Product.findById(id);
  query.exec(function (err, product){
    if (err) { return next(err); }
    if (!product) { return next(new Error("can't find product")); }
    req.product = product;
    return next();
  });
});

router.get('/shopping/:product',function(req,res) {
  res.json(req.product);
});

router.put('/shopping/:product/uporder', function(req, res, next) {
  console.log("Put Route"+req.product.Name);
  req.product.uporder(function(err, product){
    if (err) { return next(err); }
    res.json(product);
  });
});


router.delete('/shopping/:product',function(req,res) {  //what is the : for?
  req.product.remove();
  res.sendStatus(200); //this part is important
});

router.get('/shopping', function(req, res, next) { 
  console.log("Get Route");
  Product.find(function(err, products){
    if(err){ console.log("Error"); return next(err); }
    res.json(products);
  console.log("res.json Get Route");
  });
  console.log("returningGet Route");
});

router.post('/shopping', function(req, res, next) {
  console.log("Post Route");
  var product = new Product(req.body); 
  console.log("Post Route");
  console.log(product);
  product.save(function(err, product){
		console.log("Error "+err);
		if(err){  return next(err); }
    console.log("Post Route before json");
		res.json(product);
	});
});

module.exports = router;

