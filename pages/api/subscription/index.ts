import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Data = {
  message?: string;
};

async function connectDatabase() {
  const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

  return client;
}

async function insertDocument(
  client: MongoClient,
  document: { email: string }
) {
  const db = client.db();

  await db.collection("newsletter").insertOne(document);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email } = req.body;

    const regExpEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (!email || !regExpEmail.test(email)) {
      res.status(422).json({ message: "Invalid email address." });

      return;
    }

    let client: any;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed.." });
      return;
    }

    try {
      await insertDocument(client, { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed.." });
      return;
    }

    res.status(201).json({ message: "success" });
  } else {
    res.status(401).json({ message: "Invalid Request" });
  }
}
