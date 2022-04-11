import express from 'express';
import bodyParser from 'body-parser';
import { setup, ObjectId } from './mongo';

async function main() {
  const Post = await setup();
  const server = express();

  server.use(bodyParser.json());

  server.get('/running', (_, res) => res.send("OK"));

  server.post('/post/create', async (req, res) => {
    const author = req.body.author;
    const title = req.body.title;
    const content = req.body.content;

    if (!author || !title || !content) {
      res.send(statusBad('bad request'));
      return;
    }

    const post = new Post({
      author: author,
      title: title,
      content: content,
      tags: [],
      created_at: Date.now()
    });
    console.log('Created Post', post);
    await post.save();

    res.send(statusGood); 
  });

  server.get('/post', async (req, res) => {
    const author = req.body.author;

    if (author) {
      const posts = await Post.find({ author: new ObjectId(author) }); 
      res.send({
        posts: posts,
        ...statusGood
      }); 
    } else {
      const posts = await Post.find({});
      res.send({
        posts: posts,
        ...statusGood
      }); 
    }
  });

  server.listen(3001, () => console.log("Post Service Started"));
}

main().catch(reason => console.error(reason));

const statusGood = { success: true, message: "ok" };
const statusBad = (msg: string) => ({ success: false, message: msg });
