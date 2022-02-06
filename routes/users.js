import express from "express";
const router = express.Router();

router.post("/register", (req, res) => {
  res.send(req.body);
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  res.send(req.body);
});

export default router;
