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
    return next(error);
  }
  return next();
};
