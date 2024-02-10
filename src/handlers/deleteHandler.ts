import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../constants/constants.js';
import { validate } from 'uuid';

export const deleteHandler = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url?.split('/').pop();
  const userIndex = users.findIndex((user) => user.id === userId);
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
    users.splice(userIndex, 1);
    res.writeHead(201, { 'Content-Type': 'application/text' });
    res.end('user deleted');
  } catch (error) {
    console.error('The following error occurred during the DELETE request process:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
};
