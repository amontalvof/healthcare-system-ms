import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    RMQ_URL: Joi.string().required(),
    SENDGRID_API_KEY: Joi.string().required(),
    SENDGRID_FROM_EMAIL: Joi.string().required(),
});
