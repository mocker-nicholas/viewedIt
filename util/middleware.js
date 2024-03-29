import { validUserSchema } from "../schemas/user.js";
import ExpressError from "./expresserror.js";

export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((e) => next(e));
  };
};

export const validateUser = (req, res, next) => {
  const { error } = validUserSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    if (msg) {
      req.flash("error", `${msg}`);
      return res.redirect("/");
    }
    return next(error);
  }
  return next();
};

export const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.flash("error", "Please sign in");
  res.redirect("/user/login");
};
