import { APIGatewayEvent } from 'aws-lambda';

import log from './utils/log';

export const handler = async (event: APIGatewayEvent): Promise<string> => {
  try {
    return Promise.resolve(event.body || 'no body');
  } catch (e) {
    log.info(JSON.stringify(event, null, 2));
    log.error(e);
    return Promise.reject(e);
  }
};
