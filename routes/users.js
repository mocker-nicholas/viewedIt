import express from "express";
import { validateUser } from "../util/middleware.js";
import { loginUser, registerUser } from "../controllers/usercontrol.js";
const router = express.Router();

router.post("/register", validateUser, registerUser);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", loginUser);

export default router;
