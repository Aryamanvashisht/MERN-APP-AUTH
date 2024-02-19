import  mongoose  from "mongoose";
import{ MongoMemoryServer } from 'mongodb-memory-server';
import ENV from '../config.js'

const connect = async ()=>{
  const mongod = await MongoMemoryServer.create();
  const getUri = mongod.getUri();
  mongoose.set('strictQuery', true);
  // const db = await mongoose.connect(getUri)
  const db = await mongoose.connect(ENV.ATLAS_URI);
  console.log(`MongoDB connected: ${db.connection.host}`);
  return db;
}

export default connect;