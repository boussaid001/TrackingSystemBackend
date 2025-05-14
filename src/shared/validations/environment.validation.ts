import path from 'path';

import Joi from 'joi';
import dotenv from 'dotenv';

import { EnvVarsValidation } from '../interfaces/environment.interfaces';

dotenv.config({ path: path.join(__dirname, '../../.../../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string()
            .valid('production', 'development', 'test')
            .default('development'),
        PORT: Joi.number().default(3000),
        APP_NAME: Joi.string().required(),
        API_URL: Joi.string().required(),
        BASE_URL: Joi.string().required(),
        SWAGGER_BASEURL: Joi.string().required()
    })
    .unknown();

const { value: processEnvValues, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);

export const envVars: EnvVarsValidation = error
    ? ((): void => {
          throw new Error(`Config validation error: ${error.message}`);
      })()
    : processEnvValues;
export default {};
