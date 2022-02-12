import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const validUserSchema = new Joi.object({
  username: Joi.string().min(8).max(20).required(),
  password: passwordComplexity(),
  email: Joi.string().min(5).max(255).email().required(),
});
