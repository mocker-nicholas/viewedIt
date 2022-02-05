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

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/user/register", (req, res) => {
  res.send(req.body);
});

app.listen(3000, () => {
  console.log("Listing on Port 3000");
});
