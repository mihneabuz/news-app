import express from 'express';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import config from './config.json' assert { type: 'json' };

const postRouter = express.Router();
const postService = `http://${config.postServiceAddr}:${config.postServicePort}/post`;

postRouter.use((req, res, next) => {
  const auth = req.get('authorization');

  if (!auth) {
    res.statusCode = 401;
    res.send(statusBad("unauthorized"));
    return;
  }

  try {
    const identity: any = jwt.verify(auth.split(' ')[1], config.secret);
    if (identity.expires_at < Date.now()) {
      res.statusCode = 401;
      res.send(statusBad("unauthorized"));
      return;
    }

    res.locals.id = identity.id;
    res.locals.type = identity.type;
    next();

  } catch (error) {
    res.statusCode = 401;
    res.send(statusBad("unauthorized"));
  }
});

postRouter.post('/create', async (req, res) => {
  if (res.locals.type != 'journalist') {
    console.log("nu tu ma");
    res.statusCode = 401;
    res.send(statusBad("unauthorized"));
    return;
  }

  const result = await fetch(
    postService + '/create',
    {
      method: 'POST',
      body: JSON.stringify({
        author: res.locals.id,
        ...req.body
      }),
      headers: {'Content-Type': 'application/json'}
    }
  );

  res.send(await result.json());
})

postRouter.put('/tag', async (req, res) => {
})

postRouter.get('/', async (req, res) => {
  const author = req.query.author;
  const result = await fetch(postService + (!author ? '' : `?author=${author}`));

  res.send(await result.json());
});

const statusBad = (msg: string) => ({ success: false, message: msg});

export default postRouter;
