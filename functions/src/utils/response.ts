export interface Response {
  isBase64Encoded?: boolean;
  statusCode: number;
  headers?: { [headerName: string]: string };
  multiValueHeaders?: { [headerName: string]: Array<string> };
  body: string;
}

export const jsonResponse = (data: unknown, statusCode = 200): Response => ({
  statusCode,
  body: typeof data === 'string' ? data : JSON.stringify(data),
});
