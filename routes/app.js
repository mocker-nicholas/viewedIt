import express from "express";
import { isLoggedIn } from "../util/middleware.js";
const router = express.Router();

router.get("/index", isLoggedIn, (req, res) => {
  res.render("app/index");
});

export default router;
