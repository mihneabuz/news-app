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
  if (res.locals.type != 'reader') {
    res.statusCode = 401;
    res.send(statusBad("unauthorized"));
    return;
  }

  const result = await fetch(
    postService + '/tag',
    {
      method: 'PUT',
      body: JSON.stringify(req.body),
      headers: {'Content-Type': 'application/json'}
    }
  );

  res.send(await result.json());
})

postRouter.get('/', async (req, res) => {
  const author = req.query.author;
  const tag = req.query.tag;

  let query = postService;
  if (author && tag)
    query += `?author=${author}&tag=${tag}`;

  else if (author)
    query += `?author=${author}`;

  else if (tag)
    query += `?tag=${tag}`;

  const result = await fetch(query);
  res.send(await result.json());
});

const statusBad = (msg: string) => ({ success: false, message: msg});

export default postRouter;
