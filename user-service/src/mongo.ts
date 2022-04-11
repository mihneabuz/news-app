import mongoose from "mongoose";

async function setup() {
  await mongoose.connect('mongodb://0.0.0.0:27017/news-user-service');
  console.log("Connected to Mongo");

  const User = mongoose.model(
    'user', 
    new mongoose.Schema({
      username: { type: String, index: true },
      password: String,
      type: String,
      created_at: Date,
    })
  );

  return User;
}

export default setup;
