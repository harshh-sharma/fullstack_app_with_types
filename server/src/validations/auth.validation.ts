import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),   // <- add ()
    email: Joi.string().email().required(),         // email() for proper email validation
    password: Joi.string().min(4).max(8).required()
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(8).required()
});
