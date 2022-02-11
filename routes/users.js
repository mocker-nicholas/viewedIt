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
        res.redirect("login");
        req.flash("success", "Your account has been created");
      }
    } catch (e) {
      req.flash("error", `Error: ${e}`);
      res.redirect("/");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.render("app/index", { user });
  }
  res.send("Cant find user");
});

export default router;
