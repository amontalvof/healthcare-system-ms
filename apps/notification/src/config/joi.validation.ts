import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    PORT: Joi.number(),
    RMQ_URL: Joi.string().required(),
    AUTH_QUEUE: Joi.string().required(),
    NOTIFICATION_QUEUE: Joi.string().required(),
});
