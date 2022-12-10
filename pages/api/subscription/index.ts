import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Data = {
  message?: string;
};

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

    const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

    const db = client.db();

    await db.collection("newsletter").insertOne({ email });

    client.close();

    res.status(201).json({ message: "success" });
  } else {
    res.status(401).json({ message: "Invalid Request" });
  }
}
