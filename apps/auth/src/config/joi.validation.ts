import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    MONGO_DB_URI: Joi.string().required(),
    CLOUDAMQP_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION: Joi.string().required(),
});
