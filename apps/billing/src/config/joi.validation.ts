import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    MONGO_DB_URI: Joi.string().required(),
    CLOUDAMQP_URL: Joi.string().required(),
    STRIPE_SECRET_KEY: Joi.string().required(),
    STRIPE_RETURN_URL: Joi.string().uri().required(),
    STRIPE_PMC: Joi.string().required(),
});
