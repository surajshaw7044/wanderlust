const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connect to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Hello Dosto to kaise hai aaplog");
});

app.get("/listings", async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", {allListings});
});

//New Routs

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs")
})

//show Route

app.get("/listings/:id", async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//edit Route
app.get("/listings/:id/edit", async(req, res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route


app.post("/listings/:id/edit", async (req, res) => {
  let {id} = req.params.id;
  const newListing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
  console.log(newListing);
  res.redirect("/listings");
});
//try kru phir se
// app.put("/listings/:id", async (req, res) => {
//   let {id} = req.params;
//   console.log(id);
//   const listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
//   listing.save();
//   res.send("solve err");
  
// })
//kya 
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description : "by the beach",
//     price: 1200,
//     location : "Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful");
// });

app.listen(8080, () => {
  console.log("server is listen on port 8080");
});
