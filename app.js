import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import ejs from "ejs";
import mongoose from "mongoose";
import ejsMate from "ejs-mate";
import fetch from "node-fetch";

const app = express();
(async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("Mongoose Connected");
  } catch (e) {
    console.log(e);
  }
})();

console.log(process.env.REDDIT_APP, process.env.REDDIT_SECRET);

app.set("view-engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Listing on Port 3000");
});
