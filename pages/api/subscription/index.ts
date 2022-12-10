import type { NextApiRequest, NextApiResponse } from "next";
import { connectDatabase, insertDocument } from "@Helpers/db-util";

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

    let client: any;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed.." });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email });
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
