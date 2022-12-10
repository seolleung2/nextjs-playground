import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

  return client;
}

export async function insertDocument(
  client: MongoClient,
  collection: string,
  document: any
) {
  const db = client.db();

  return await db.collection(collection).insertOne(document);
}
