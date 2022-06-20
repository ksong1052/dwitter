import dotenv from 'dotenv';
dotenv.config();

// 지정되지 않은 key 혹은 없는 key값을 받아 올 때, error 처리
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if(value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUND', 12)),
  },    
  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    database: required('DB_DATABASE'),
    password: required('DB_PASSWORD'),
  },
  mongodb: {
    host: required('MONGO_DB_URL'),
  },
  port: parseInt(required('HOST_PORT', 8080)),  
  cors: {
    allowedOrigin: required('CORS_ALLOW_ORIGIN'),
  },
}