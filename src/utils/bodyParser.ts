import { IncomingMessage, ServerResponse } from 'http';

export const bodyParser = <T, U>(req: IncomingMessage, res: ServerResponse, callback:(arg: T)=>U) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const parsedBody = JSON.parse(body);
      callback(parsedBody);
    } catch (error) {
      res.statusCode = 400;
      res.end('Invalid JSON');
    }
  });
};
