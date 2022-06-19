import { getTweets } from '../db/mongodb.js';
import * as userRepository from './auth.js';

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
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,    
    include: {
      ...INCLUDE_USER.include,
      where: { username }
    }
  });
}

export async function getById(id) {
  return Tweet.findOne({
    ...INCLUDE_USER,    
    where: { id }    
  });
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
      console.log(data);
      return data;
    });
}

export async function update(id, text) {
  return Tweet.findByPk(id, INCLUDE_USER)
    .then((tweet) => {
      tweet.text = text;
      return tweet.save();
    });
}

export async function remove(id) {
  return Tweet.findByPk(id)
    .then((tweet) => {
      tweet.destroy();
    });
}
