import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    PORT: Joi.string().required(),
    RMQ_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION: Joi.string().required(),
    CORS_ORIGIN: Joi.string().required(),
    CORS_METHODS: Joi.string().required(),
    REDIS_URL: Joi.string().required(),
    SEED_BASIC_USER: Joi.string().required(),
    SEED_BASIC_PASS: Joi.string().required(),
    STRIPE_WEBHOOK_SECRET: Joi.string().required(),
    NODE_ENV: Joi.string().required().valid('development', 'production'),
});
