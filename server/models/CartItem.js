// models/CartItem.js
const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  name: { type: String, require: true },
  quantity: { type: Number, require: true },
  priceInclTax: { type: Number, require: true },
  priceExclTax: { type: Number, require: true },
  image: { type: String, require: true },
  variants: { type: String, require: true },
  selectedVariants: { type: Array, require: true },
  uniqueKey: { type: String, require: true },
});

module.exports = mongoose.model("CartItem", CartItemSchema);
