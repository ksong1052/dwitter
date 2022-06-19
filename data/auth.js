// Database(MongoDB)에 직접적으로 상호 작용하는 부분만 정의
// 자동으로 import되었을 때는 반드시 확장자인 .js를 붙여 줘야 한다. 

import Mongoose from 'mongoose';
import { useVirtualId } from '../db/mongodb.js';

const userSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  url: String,
});

// _id => id
// 아래의 정의를 해 주면, DB상에서는 "_id"로 저장되지만 code상에서는 "id"로 변환 시켜 준다.
useVirtualId(userSchema);

const User = Mongoose.model('User', userSchema);

export async function findByUsername(username) {
  return User.findOne({ username });    
}

export async function findById(id) {
  return User.findById(id);  
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);  
}

