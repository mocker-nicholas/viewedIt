import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import mongoose from "mongoose";
import ejsMate from "ejs-mate";
import ExpressError from "./util/expresserror.js";
import userRouter from "./routes/users.js";
import appRouter from "./routes/app.js";
import session from "express-session";
import flash from "connect-flash";

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
app.use(
  session({
    secret: "mysecret",
    httpOnly: true,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  /// setup locals as session variables if you want ot access them in your template. After you create them here, you can define the req vals in your routes ///
  res.locals.user = req.session.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  return next();
});

app.use("/user", userRouter);
app.use("/app", appRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong...." } = err;
  if (!err.message) err.message("Oh No! Something went wrong!");
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Listing on Port 3000");
});
