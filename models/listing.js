const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://unsplash.com/photos/brown-cabin-surrounded-by-grass-and-trees-G63__2LCIyU",
    set: (v) =>
      v === ""
        ? "default link"
        : "https://unsplash.com/photos/brown-cabin-surrounded-by-grass-and-trees-G63__2LCIyU",
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;