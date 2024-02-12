import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import { User } from '../types/types.js';
import { validate } from 'uuid';

export const getHandler = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url?.split('/').pop();
  const users = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  console.log(userId);
  if (userId === 'users' || userId === '') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(JSON.stringify(users));
    return;
  }
  if (!validate(userId!)) {
    res.writeHead(400);
    res.end(`UserId "${userId}" is not valid`);
    return;
  }
  const user = users.find((user:User) => user.id === userId);

  if (!user) {
    res.writeHead(404);
    res.end(`User with id ${userId} does not exist`);
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};
