import mongoose from "mongoose";

async function setup() {
  await mongoose.connect('mongodb://mongo:27017/news-user-service');
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

  if (await User.count() == 0)
    await User.create(mockData);

  return User;
}

const ObjectId = mongoose.Types.ObjectId;

const mockData = [
  {
    _id: new ObjectId("625445edb6bcaecdbea5ef6f"),
    username: 'IonVasile',
    password: 'test',
    type: 'journalist',
    created_at: new Date("2022-04-08T15:14:53.839Z"),
  },
  {
    _id: new ObjectId("6aaaaaedb6bcaecdaeaaea6f"),
    username: 'Gigi',
    password: 'test123',
    type: 'journalist',
    created_at: new Date("2021-04-18T15:14:53.839Z"),
  },
  {
    _id: new ObjectId("6111111111bcaecdbea5ef6f"),
    username: 'arch',
    password: 'parola',
    type: 'reader',
    created_at: new Date("2021-09-10T12:14:53.839Z"),
  },
  {
    _id: new ObjectId("622222ed22bcaecdbea5ef6f"),
    username: 'dalv',
    password: 'test',
    type: 'reader',
    created_at: new Date("2022-02-14T12:11:53.839Z"),
  },
  {
    _id: new ObjectId("623333edb3bcaecdbea5ef6f"),
    username: 'anonymus',
    password: 'test',
    type: 'journalist',
    created_at: new Date("2022-01-01T19:14:53.839Z"),
  },
]

export { setup, ObjectId };
