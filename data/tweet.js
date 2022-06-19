import MongoDb from 'mongodb';
import { getTweets } from '../db/mongodb.js';
import * as userRepository from './auth.js';

const ObjectId = MongoDb.ObjectId;

export async function getAll() {
  return getTweets()
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then((data) => {
      console.log(data);
      return data;
    })
}

export async function getAllByUsername(username) {
  return getTweets()
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    name: name,
    username: username,
    url: url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => {
      const newTweet = mapOptionalTweet({ ...tweet, _id: data.insertedId });
      console.log(newTweet);
      return newTweet;
    });
}

//  { returnDocument: 'after' } => 이 옵션을 줘야 update된 data를 return해 준다.
export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { text: text } },
      { returnDocument: 'after' }
    )
    .then(result => result.value)
    .then(mapOptionalTweet)
}

export async function remove(id) {
  return getTweets()
    .deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets){
  // return tweets.map(tweet => mapOptionalTweet(tweet));
  return tweets.map(mapOptionalTweet);  // 위와 같은 의미 => 인자가 같으면 모두 생략 가능
}