import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { bodyParser } from '../utils/bodyParser.js';
import { User } from '../types/types.js';
import { InterfaceChecker } from '../utils/InterfaceChecker.js';

export const postHandler = (req: IncomingMessage, res: ServerResponse) => {
  const users = JSON.parse(fs.readFileSync('db.json', 'utf8'));
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
      fs.writeFileSync('db.json', JSON.stringify(users));
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(parsedBody));
    });
  } catch (error) {
    console.error('The following error occurred during the POST request process:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};
