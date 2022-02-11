import express from "express";
import User from "../models/user.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const newUser = await new User({ username, email, password });
  const registeredUser = await newUser.save();
  res.send(registeredUser);
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  res.send(req.body);
});

export default router;
