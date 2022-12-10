import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Data = {
  message?: string;
  comment?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { eventId } = req.query;

  const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

  const db = client.db();

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    const regExpEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (
      !email ||
      !regExpEmail.test(email) ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });

      return;
    }

    const comment = {
      eventId,
      email,
      name,
      text,
    };

    const result = await db.collection("comments").insertOne(comment);

    const newComment = {
      id: result.insertedId,
      eventId,
      email,
      name,
      text,
    };

    res.status(201).json({ message: "Added comment", comment: newComment });
  }

  if (req.method === "GET") {
    const comments = await db
      .collection("comments")
      .find({ eventId: eventId })
      .sort({ _id: -1 })
      .toArray();

    res.status(201).json({ comment: comments });
  }

  client.close();
}
