import express from 'express';
import bodyParser from 'body-parser';
import { setup, ObjectId } from './mongo';
import config from './config.json';

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
    let filter: any = {};

    const author = req.query.author;
    if (author) {
      filter.author = new ObjectId(author.toString());
    }

    const tag = req.query.tag;
    if (tag) {
      filter.tags = tag;
    }

    const posts = await Post.find(filter); 
    res.send({
      posts: posts,
      ...statusGood
    }); 
  });

  server.put('/post/tag', async (req, res) => {
    const id = req.body.id;
    const tag = req.body.tag;

    if (!id || !tag) {
      res.send(statusBad('bad request'));
      return;
    }

    await Post.findByIdAndUpdate(new ObjectId(id), { $push: { tags: tag } });
    res.send(statusGood);
  })

  server.listen(config.postServicePort, () => console.log("Post Service Started"));
}

main().catch(reason => console.error(reason));

const statusGood = { success: true, message: "ok" };
const statusBad = (msg: string) => ({ success: false, message: msg });
