import { IncomingMessage, ServerResponse } from 'http';
import { getHandler } from './getHandler.js';
import { postHandler } from './postHandler.js';
import { puttHandler } from './putHandler.js';
import { deleteHandler } from './deleteHandler.js';

export const reqHandler = (req: IncomingMessage, res: ServerResponse) => {
  switch (req.method) {
    case 'GET':
      getHandler(req, res);
      break;
    case 'POST':
      postHandler(req, res);
      break;
    case 'PUT':
      puttHandler(req, res);
      break;
    case 'DELETE':
      deleteHandler(req, res);
      break;

    default:
      console.log('Invalid method');
  }
};
