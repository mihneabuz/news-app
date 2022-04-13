import express from 'express';
import bodyParser from 'body-parser';
import postRouter from './postRouter.js';
import userRouter from './userRouter.js';

async function main() {
  const server = express();
  // NOTE: this is used for testing
  server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === "OPTIONS") {
      res.statusCode = 200;
      res.send();
      return;
    }

    next();
  });

  server.use(bodyParser.json({ type: "*/*" }));

  server.get('/running', (_, res) => { res.send('OK') });

  server.use('/user', userRouter);
  server.use('/post', postRouter);

  server.listen(3000, () => console.log("Started API Gateway"));
}

main().catch(reason => console.error(reason));
