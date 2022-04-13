import express from 'express';
import bodyParser from 'body-parser';
import postRouter from './postRouter.js';
import userRouter from './userRouter.js';

async function main() {
  const server = express();
  server.use(bodyParser.json());

  server.get('/running', (_, res) => { res.send('OK') });

  server.use('/user', userRouter);
  server.use('/post', postRouter);

  server.listen(3000, () => console.log("Started API Gateway"));
}

main().catch(reason => console.error(reason));
