import express from 'express';
import bodyParser from 'body-parser';
import setup from './mongo';

type UserType = 'reader' | 'journalist';

async function main() {
  const User = await setup();
  const server = express();

  server.use(bodyParser.json());

  server.get('/running', (_, res) => res.send("OK"));

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

    console.log(user);

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

main().catch(reason => console.log(reason));

const statusGood = { success: true, message: "ok" };
const statusBad = (msg: string) => ({ success: false, message: msg });
