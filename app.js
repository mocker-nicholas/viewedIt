import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import mongoose from "mongoose";
import ejsMate from "ejs-mate";
import fetch from "node-fetch";
import userRouter from "./routes/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
(async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/viewedIt");
    console.log("Mongoose Connected");
  } catch (e) {
    console.log(e);
  }
})();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Listing on Port 3000");
});
