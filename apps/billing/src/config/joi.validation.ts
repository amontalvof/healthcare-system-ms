import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    MONGO_DB_URI: Joi.string().required(),
    RMQ_URL: Joi.string().required(),
    STRIPE_SECRET_KEY: Joi.string().required(),
});
