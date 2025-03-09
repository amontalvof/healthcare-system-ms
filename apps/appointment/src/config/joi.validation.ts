import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    RMQ_URL: Joi.string().required(),
});
