import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse,
) {
  if (req.method !== `POST`) {
    res.status(405);
    res.send('Method not allowed');
  }

  if (!req.body.email) {
    return res.status(422).json('Email field is required');
  }

  res.status(200);
  res.send('OK');
}
