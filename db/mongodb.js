import Mongoose from 'mongoose';
import { config } from '../config.js';


export async function connectDB() {
  return Mongoose.connect(config.mongodb.host, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  });    
}

// _id => id
// 아래의 정의를 해 주면, DB상에서는 "_id"로 저장되지만 code상에서는 "id"로 변환 시켜 준다.
export function useVirtualId (schema) {
  schema.virtual('id').get(function() {
    return this._id.toString();
  })
  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });
}
