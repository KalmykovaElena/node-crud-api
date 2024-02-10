import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../constants/constants.js';
import { v4 as uuidv4 } from 'uuid';
import { bodyParser } from '../utils/bodyParser.js';
import { User } from '../types/types.js';
import { InterfaceChecker } from '../utils/InterfaceChecker.js';

export const postHandler = (req: IncomingMessage, res: ServerResponse) => {
  try {
    bodyParser(req, res, (parsedBody:User) => {
      const personChecker = new InterfaceChecker<User>({ username: '', age: 0, hobbies: [] });
      const isPersonValid = personChecker.check(parsedBody as User);
      if (!isPersonValid) {
        res.writeHead(400);
        res.end('Invalid body request');
        return;
      }
      parsedBody.id = uuidv4();
      users.push(parsedBody);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(parsedBody));
    });
  } catch (error) {
    console.error('The following error occurred during the POST request process:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};
