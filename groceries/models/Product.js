var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  Name: String,
  price: {type: Number, default:0},
  image: String,
  orders: {type: Number, default:0}
});

ProductSchema.methods.uporder = function(cb) {
  this.orders += 1;
  this.save(cb);
};


mongoose.model('Product',ProductSchema);