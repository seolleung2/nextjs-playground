import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

type Data = {
  message?: string;
  comment?: any;
};

export function buildSubscriptionPath() {
  return path.join(process.cwd(), "data", "comments.json");
}

export function extractJson(filePath: any) {
  const fileData = fs.readFileSync(filePath, "utf8");

  const data = JSON.parse(fileData);

  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { eventId } = req.query;

  const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);

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

    const db = client.db();
    const result = await db.collection("comments").insertOne(comment);

    const newComment = {
      id: result.insertedId,
      eventId,
      email,
      name,
      text,
    };

    const filePath = buildSubscriptionPath();
    const data = extractJson(filePath);

    data.push(newComment);

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Added comment", comment: newComment });
  }

  if (req.method === "GET") {
    const filePath = buildSubscriptionPath();
    const data = extractJson(filePath);

    const filteredData = data.filter(
      (comment: any) => comment.eventId === eventId
    );

    res.status(201).json({ comment: filteredData });
  }

  client.close();
}
