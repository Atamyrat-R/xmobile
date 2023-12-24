import { User, users } from "@/pages/schema/users";
import { APIResponse } from "@/pages/shared/apiresponse";
import runMiddleware from "@/pages/shared/cors";
import { dbClient } from "@/pages/shared/dbClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) {
  await runMiddleware(req, res);
  if (req.method === "POST") {
    res.status(200).json({
      success: true,
      message: "POST request",
    });
  } else if (req.method === "GET") {
    const user: User[] = await dbClient.select().from(users);
    res.status(200).json({
      success: true,
      data: user,
    });
  }
}
