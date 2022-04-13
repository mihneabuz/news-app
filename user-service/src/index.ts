import express from 'express';
import bodyParser from 'body-parser';
import { setup, ObjectId } from './mongo';

type UserType = 'reader' | 'journalist';

async function main() {
  const User = await setup();
  const server = express();

  server.use(bodyParser.json());

  server.get('/running', (_, res) => res.send("OK"));

  server.post('/usernames', async (req, res) => {
    const ids = req.body.ids;
    if (ids && Array.isArray(ids)) {
      const users = await User.find().where('_id').in(ids.map(x => new ObjectId(x)));

      res.send({
        users: users.map(user => ({ id: user._id, username: user.username })),
        ...statusGood
      });
    } else {
      res.send(statusBad("bad request"));
    }
  });

  server.get('/info', async (req, res) => {
    const id = req.query.id;

    if (!id) {
      res.send(statusBad("bad request"));
      return;
    }

    res.send(await User.findById(new ObjectId(id.toString())));
  });

  server.post('/register', async (req, res) => {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const type: UserType = req.body.type;

    if (!username || !password || !type || (type != 'reader' && type != 'journalist')) {
      res.send(statusBad("bad request"));
      return;
    }

    const exists = await User.find({ username: username });
    if (exists.length > 0) {
      res.send(statusBad("username in use"));
      return;
    }

    const user = new User({
      username: username,
      password: password,
      type: type,
      created_at: Date.now()
    });
    console.log('Registered user', user);
    await user.save();

    res.send(statusGood);
  });

  server.post('/login', async (req, res) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    if (!username || !password) {
      res.send(statusBad("bad request"));
      return;
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      res.send(statusBad("bad username"));
      return;
    }

    if (user.password != password) {
      res.send(statusBad("bad password"));
      return;
    }

    res.send({
      id: user._id,
      username: user.username,
      type: user.type,
      created_at: user.created_at,
      ...statusGood
    });
  });

  server.listen(3000, () => console.log("User Service Started"));
}

main().catch(reason => console.error(reason));

const statusGood = { success: true, message: "ok" };
const statusBad = (msg: string) => ({ success: false, message: msg });
