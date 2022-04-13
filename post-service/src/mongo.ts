import mongoose from "mongoose";

async function setup() {
  await mongoose.connect('mongodb://mongo:27017/news-post-service');
  console.log("Connected to Mongo");

  const Post = mongoose.model(
    'post', 
    new mongoose.Schema({
      author: { type: mongoose.Types.ObjectId, index: true },
      title: String,
      content: String,
      tags: [String],
      created_at: Date,
    })
  );

  if (await Post.count() == 0)
    await Post.create(mockData);

  return Post;
}

const ObjectId = mongoose.Types.ObjectId;

const mockData = [
  {
    _id: new ObjectId("62544d1f1de30a1f1150d817"),
    author: new ObjectId("623333edb3bcaecdbea5ef6f"),
    title: 'ce spun romanii',
    content: 'am intrebat 100 de romani',
    tags: [
      "funny"
    ],
    created_at: new Date("2022-04-11T15:47:27.203Z"),
  },
  {
    _id: new ObjectId("62544d8f2de30a1fc222d817"),
    author: new ObjectId("625445edb6bcaecdbea5ef6f"),
    title: 'accident',
    content: 'accident pe A1',
    tags: [
      "breaking"
    ],
    created_at: new Date("2022-04-11T15:47:27.203Z"),
  },
  {
    _id: new ObjectId("62544d3f83e33a1f3a50d817"),
    author: new ObjectId("6aaaaaedb6bcaecdaeaaea6f"),
    title: 'razboi',
    content: 'rusia s-a plictisit',
    tags: [],
    created_at: new Date("2022-04-11T15:47:27.203Z"),
  },
  {
    _id: new ObjectId("65544d4f5d430a4f3a50d817"),
    author: new ObjectId("6aaaaaedb6bcaecdaeaaea6f"),
    title: 'covid',
    content: 'toata lume a uitat de covid',
    tags: [],
    created_at: new Date("2022-04-11T15:47:27.203Z"),
  },
  {
    _id: new ObjectId("65544d4f5d430a4f3a50d817"),
    author: new ObjectId("623333edb3bcaecdbea5ef6f"),
    title: 'Lorem Ipsum',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo quam at condimentum dapibus. Maecenas at neque arcu. Integer mattis dapibus porttitor. Vivamus orci quam, commodo eu sodales nec, gravida eu nunc. Aliquam erat volutpat. In egestas finibus tortor. In et interdum nisl. Curabitur eu tincidunt est. Nunc a sapien nec sem lacinia finibus. Fusce blandit at magna non tincidunt.',
    tags: ["deep"],
    created_at: new Date("2022-04-11T15:47:27.203Z"),
  },
]

export { setup, ObjectId };
