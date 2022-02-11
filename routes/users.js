import express from "express";
import User from "../models/user.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const newUser = await new User({ username, email, password });
  const registeredUser = await newUser.save();
  res.redirect("login");
});

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
