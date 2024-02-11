import http from 'http';
import 'dotenv/config';
import fs from 'fs';
import { END_POINTS } from './constants/constants.js';
import { reqHandler } from './handlers/reqHandler.js';

const PORT = process.env.PORT || 3000;
const server = http.createServer(async (req, res) => {
  if (req.url && !Object.values(END_POINTS).find((path) => req.url!.startsWith(path))) {
    res.writeHead(404);
    res.end('Invalid request');
    return;
  }
  try {
    return await reqHandler(req, res);
  } catch (error) {
    res.writeHead(500);
    res.end('Unexpected error on server');
  }
});

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
process.on('SIGINT', () => {
  fs.writeFileSync('db.json', '[]');
  process.exit();
});
