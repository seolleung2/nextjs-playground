import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
  message?: string;
};

export function buildSubscriptionPath() {
  return path.join(process.cwd(), "data", "comments.json");
}

export function extractJson(filePath: any) {
  const fileData = fs.readFileSync(filePath, "utf8");

  const data = JSON.parse(fileData);

  return data;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { eventId } = req.query;
    const { email, name, text } = req.body;

    const newSubscription = {
      id: new Date().toISOString(),
      eventId,
      email,
      name,
      text,
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
