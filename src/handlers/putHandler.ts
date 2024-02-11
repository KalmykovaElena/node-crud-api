import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import { validate } from 'uuid';
import { bodyParser } from '../utils/bodyParser.js';
import { User } from '../types/types.js';
import { InterfaceChecker } from '../utils/InterfaceChecker.js';

export const puttHandler = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url?.split('/').pop();
  const users = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  const userIndex = users.findIndex((user: User) => user.id === userId);
  if (!userId || !validate(userId)) {
    res.writeHead(400);
    res.end('UserId is not valid');
    return;
  }
  if (userIndex === -1) {
    res.writeHead(404);
    res.end(`User with Id ${userId} doesn't exist`);
    return;
  }
  try {
    bodyParser(req, res, (parsedBody: User) => {
      const personChecker = new InterfaceChecker<User>({ username: '', age: 0, hobbies: [] });
      const isPersonValid = personChecker.check(parsedBody as User);
      if (!isPersonValid) {
        res.writeHead(400);
        res.end('Invalid body request');
        return;
      }
      parsedBody.id = userId;
      users.splice(userIndex, 1, parsedBody);
      fs.writeFileSync('db.json', JSON.stringify(users));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(parsedBody));
    });
  } catch (error) {
    console.error('The following error occurred during the PUT request process:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};
