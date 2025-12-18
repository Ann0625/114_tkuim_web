import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);
export function getCollection(name) { return client.db().collection(name); }

async function connect() {
  await client.connect();
  console.log("✅ 成功連線至 MongoDB");
}
await connect();