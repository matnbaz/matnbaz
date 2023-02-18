import * as Joi from 'joi';

export interface EnvironmentVariables {
  DATABASE_URL: string;
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: string;
  PORT: string;
  GITHUB_TOKEN?: string;
  GITHUB_BOT_TOKEN?: string;
  ADMIN_COOKIE_SECRET?: string;
}

export const validationSchemaForEnv = Joi.object<EnvironmentVariables, true>({
  DATABASE_URL: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_PORT: Joi.string().required(),
  PORT: Joi.string().required(),
  GITHUB_TOKEN: Joi.string().optional(),
  GITHUB_BOT_TOKEN: Joi.string().optional(),
  ADMIN_COOKIE_SECRET: Joi.string().optional(),
});
