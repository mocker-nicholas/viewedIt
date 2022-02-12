import User from "../models/user.js";
import { catchAsync } from "../util/middleware.js";

export const registerUser = catchAsync(async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const newUser = await new User({ username, email, password });
    if (newUser) {
      const registeredUser = await newUser.save();
      req.session.user_id = registeredUser._id;
      req.flash("success", "Your account has been created");
      return res.redirect("login");
    }
  } catch (e) {
    if (e.code === 11000)
      req.flash("error", `${username} is not an available username`);
    return res.redirect("/");
  }
});

export const loginUser = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    req.flash("error", `Error: Username or Password is invalid`);
    return res.redirect("login");
  }
  return res.render("app/index", { user });
});