import express from "express";
const router = express.Router();

router.get("/index", (req, res) => {
  res.render("app/index");
});

export default router;
