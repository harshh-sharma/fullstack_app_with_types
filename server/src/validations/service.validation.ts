import Joi, { string } from "joi";

export const serviceSchema = Joi.object({
    name:Joi.string().min(3).max(25).required(),
    type: Joi.string().valid('NORMAL', 'VIP').required()
})