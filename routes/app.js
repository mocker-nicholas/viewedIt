import express from "express";
import fetch from "node-fetch";
import { isLoggedIn } from "../util/middleware.js";
const router = express.Router();

router.get("/index", isLoggedIn, (req, res) => {
  res.render("app/index");
});

router.get("/index/top", isLoggedIn, async (req, res) => {
  try {
    const response = await fetch(
      `https://www.reddit.com/r/all/top.json?t=day&limit=20`
    );
    const data = await response.json();
    return res.json(data.data.children);
  } catch (e) {
    return res.json(e);
  }
});

router.get("/index/sports", isLoggedIn, async (req, res) => {
  try {
    const response = await fetch(
      `https://www.reddit.com/r/sports/top.json?t=day&limit=20`
    );
    const data = await response.json();
    return res.json(data.data.children);
  } catch (e) {
    return res.json(e);
  }
});

export default router;
