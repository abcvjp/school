import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('worker', () => {
  const { MAILER_CLIENT_ID, MAILER_CONSUMER_GROUP_ID, KAFKA_HOST, KAFKA_PORT } =
    process.env;
  const config = {
    mailer: {
      client: {
        clientId: MAILER_CLIENT_ID || 'mailer',
        brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
      },
      consumer: {
        groupId: MAILER_CONSUMER_GROUP_ID || 'mailer-consumer',
      },
    },
  };
  const schema = Joi.object({
    mailer: Joi.object({
      client: Joi.object({
        clientId: Joi.string(),
        brokers: Joi.array().items(Joi.string()),
      }),
      consumer: Joi.object({
        groupId: Joi.string(),
      }),
    }),
  });
  const validationResult = schema.validate(config);
  if (validationResult.error) {
    throw Error(`Validate db config: ${validationResult.error.message}`);
  }
  return config;
});
