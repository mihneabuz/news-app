import express from 'express';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import config from './config.json' assert { type: 'json' };

const userRouter = express.Router();
const userService = `http://${config.userServiceAddr}:${config.userServicePort}`;

userRouter.get('/info', async (req, res) => {
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

    const result = await fetch(userService + `/info?id=${identity.id}`);
    res.send(await result.json());

  } catch (error) {
    console.warn(error);
    res.statusCode = 401;
    res.send(statusBad("unauthorized"));
  }
})

userRouter.post('/login', async (req, res) => {
  const result = await fetch(
    userService + '/login',
    {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {'Content-Type': 'application/json'}
    }
  );
  const resultBody: any = await result.json();

  if (resultBody.success === false) {
    res.send(statusBad(resultBody.message));
    return;
  }

  const token = jwt.sign({
    id: resultBody.id,
    username: resultBody.username,
    type: resultBody.type,
    expires_at: Date.now() + (60 * 60 * 1000)
  }, config.secret, { noTimestamp: true });

  res.send({
    jwt: token,
    ...statusGood
  });
});

userRouter.post('/register', async (req, res) => {
  const result = await fetch(
    userService + '/register',
    {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {'Content-Type': 'application/json'}
    }
  );
  const resultBody = await result.json();

  res.send(resultBody);
});

const statusGood = { success: true, message: 'ok' };
const statusBad = (msg: string) => ({ success: false, message: msg});

export default userRouter;
