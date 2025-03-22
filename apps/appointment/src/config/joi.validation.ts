import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    RMQ_URL: Joi.string().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.string().required(),
});
