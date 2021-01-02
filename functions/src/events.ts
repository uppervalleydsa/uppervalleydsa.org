import { APIGatewayEvent } from 'aws-lambda';

import log from './utils/log';
import { Response, jsonResponse } from './utils/response';

export const handler = async (event: APIGatewayEvent): Promise<Response> => {
  try {
    return Promise.resolve(jsonResponse(event.headers));
  } catch (e) {
    log.info(JSON.stringify(event, null, 2));
    log.error(e);
    return Promise.reject(jsonResponse({ error: e.message }, 500));
  }
};
