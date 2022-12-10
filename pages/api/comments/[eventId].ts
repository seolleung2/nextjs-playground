import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, insertDocument } from "@Helpers/db-util";

type Data = {
  message?: string;
  comment?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { eventId } = req.query;

  let client: any;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed.." });
    return;
  }

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
      client.close();
      return;
    }

    const comment = {
      eventId,
      email,
      name,
      text,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", comment);

      const newComment = {
        _id: result.insertedId,
        eventId,
        email,
        name,
        text,
      };

      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed.." });
    }
  }

  if (req.method === "GET") {
    const db = client.db();

    try {
      const comments = await db
        .collection("comments")
        .find({ eventId: eventId })
        .sort({ _id: -1 })
        .toArray();

      res.status(201).json({ comment: comments });
    } catch (error) {
      res.status(500).json({ message: "Getting comment list failed.." });
    }
  }

  client.close();
}
