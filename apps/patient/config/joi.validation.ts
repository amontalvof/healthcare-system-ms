import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    PORT: Joi.number(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION: Joi.string().required(),
    RMQ_URL: Joi.string().required(),
    PATIENT_QUEUE: Joi.string().required(),
});
