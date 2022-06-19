// Database(MongoDB)에 직접적으로 상호 작용하는 부분만 정의
// 자동으로 import되었을 때는 반드시 확장자인 .js를 붙여 줘야 한다. 

import { getUsers } from '../db/mongodb.js';
import MongoDb from 'mongodb';

const ObjectId = MongoDb.ObjectId;

export async function findByUsername(username) {
  return getUsers()
    .findOne({ username })
    .then((data) => { 
      // =>>> id: data._id => 이렇게 해 주는 이유는 기존의 controller(application에서)에서 사용되던 id값을 정상적으로 전달하기 위해 
      // const user = {...data, id: data._id}; 
      // console.log(user);
      // return user;

      return mapOptionalUser(data);
    });
}

export async function findById(id) {
  return getUsers().findOne({ _id: new ObjectId(id) })
    .then(mapOptionalUser);   // 전달받은 인자와 함수의 인자가 같은 경우 이렇게 사용할 수도 있다.
}

export async function createUser(user) {
  return getUsers().insertOne(user)
    .then(data => data.insertedId.toString());  // insertedId가 object형태이기 때문에 string형태로 변환 시켜 줘야 한다.
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id } : user;
}
