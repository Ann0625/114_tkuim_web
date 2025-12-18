import { getCollection } from '../db.js';

export async function findByEmail(email) {
  return getCollection('users').findOne({ email });
}

export async function create(user) {
  const result = await getCollection('users').insertOne(user);
  return { ...user, _id: result.insertedId };
}