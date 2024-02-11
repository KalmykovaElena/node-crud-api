import cluster from 'cluster';
import http from 'http';
import { cpus } from 'os';
import fs from 'fs';
import 'dotenv/config';
import { reqHandler } from './handlers/reqHandler.js';
import { END_POINTS } from './constants/constants.js';

if (cluster.isPrimary) {
  const numCPUs = cpus().length;
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();

    worker.on('message', (msg) => {
      console.log(`Message from worker ${worker.process.pid}: ${msg}`);
    });
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const server = http.createServer((req, res) => {
    if (req.url && !Object.values(END_POINTS).find((path) => req.url!.startsWith(path))) {
      res.writeHead(404);
      res.end('Invalid request');
      return;
    }
    try {
      return reqHandler(req, res);
    } catch (error) {
      res.writeHead(500);
      res.end('Unexpected error on server');
    }
  });
  const PORT = process.env.PORT || 3000;
  const startPort = +PORT + cluster.worker!.id;
  server.listen(startPort);

  console.log(`Worker ${process.pid} started on PORT: ${startPort}`);
  process.on('message', (msg) => {
    console.log(`Message received by worker ${process.pid}: ${msg}`);
  });
}
process.on('SIGINT', () => {
  fs.writeFileSync('db.json', '[]');
  process.exit();
});
