import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    PORT: Joi.number(),
    MONGO_DB_URI: Joi.string().required(),
    RMQ_URL: Joi.string().required(),
    AUTH_QUEUE: Joi.string().required(),
    NOTIFICATION_QUEUE: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION: Joi.string().required(),
});
