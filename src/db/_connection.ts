import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env['MONGO_URL'];
const ENV = process.env['ENV'];

if (!uri || !ENV) {
  throw 'env variable not found';
}

const client = new MongoClient(uri);

export async function connect() {
  await client.connect();
}

export function getClient() {
  return client;
}

export function getDb() {
  return client.db('8200_news');
}