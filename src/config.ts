import dotenv from 'dotenv';
dotenv.config();

export default {
  MONGO_DATABASE: process.env.MONGO_DATABASE || 'mertask2',
  MONGO_USER: process.env.MONGO_USER || '',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || '',
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  PORT: process.env.PORT || 4000,
  SECRET_WORD: process.env.SECRET_WORD || 'palabrasecreta',
};
