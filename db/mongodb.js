import MongoDb from 'mongodb';
import { config } from '../config.js';

let db;
export async function connectDB() {
  return MongoDb.MongoClient.connect(config.mongodb.host) 
    .then((client) => {
      db = client.db();
    });
}

// Getting User Collection
export function getUsers() {
  return db.collection('users');
}

// Getting Tweet Collection
export function getTweets() {
  return db.collection('tweets');
}