import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    CLOUDAMQP_URL: Joi.string().required(),
    BREVO_API_KEY: Joi.string().required(),
    BREVO_FROM_EMAIL: Joi.string().required(),
});
