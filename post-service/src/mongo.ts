import mongoose from "mongoose";

async function setup() {
  await mongoose.connect('mongodb://0.0.0.0:27017/news-post-service');
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

  return Post;
}

const ObjectId = mongoose.Types.ObjectId;

export { setup, ObjectId };
