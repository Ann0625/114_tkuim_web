import { ObjectId } from 'mongodb';
import { getCollection } from '../db.js';

export async function findAll() {
  return getCollection('participants').find().toArray();
}

export async function findByOwner(ownerId) {
  return getCollection('participants').find({ ownerId }).toArray();
}

export async function findById(id) {
  return getCollection('participants').findOne({ _id: new ObjectId(id) });
}

export async function create(data) {
  const result = await getCollection('participants').insertOne(data);
  return { ...data, _id: result.insertedId };
}

export async function deleteOne(id) {
  return getCollection('participants').deleteOne({ _id: new ObjectId(id) });
}