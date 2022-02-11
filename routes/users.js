import express from "express";
import User from "../models/user.js";
import { catchAsync } from "../util/middleware.js";
const router = express.Router();

router.post(
  "/register",
  catchAsync(async (req, res) => {
    const { username, password, email } = req.body;
    try {
      const newUser = await new User({ username, email, password });
      if (newUser) {
        const registeredUser = await newUser.save();
        req.session.user_id = user._id;
        req.flash("success", "Your account has been created");
        return res.redirect("login");
      }
    } catch (e) {
      req.flash("error", `${e}`);
      return res.redirect("/");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      req.flash("error", `Error: Username or Password is invalid`);
      return res.redirect("login");
    }
    return res.render("app/index", { user });
  })
);

export default router;
