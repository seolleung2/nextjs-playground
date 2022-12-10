import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

type Data = {
  message?: string;
};

export function buildSubscriptionPath() {
  return path.join(process.cwd(), "data", "subscription.json");
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

    const newSubscription = {
      id: new Date().toISOString(),
      email,
    };

    const filePath = buildSubscriptionPath();
    const data = extractJson(filePath);

    data.push(newSubscription);

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "success" });
  } else {
    res.status(401).json({ message: "Invalid Request" });
  }
}
