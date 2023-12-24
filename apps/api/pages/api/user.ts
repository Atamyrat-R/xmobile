import { NewUser, User, users } from "@/pages/schema/users";
import { APIResponse } from "@/pages/shared/apiresponse";
import runMiddleware from "@/pages/shared/cors";
import { dbClient } from "@/pages/shared/dbClient";
import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) {
  await runMiddleware(req, res);
  if (req.method === "POST") {
    const { email, name }: NewUser = req.body;
    if (email == null || name == null)
      return res.status(400).json({
        success: false,
        message: "either email or name not provided in the user body",
      });
    const newUser = await dbClient
      .insert(users)
      .values({ name, email })
      .returning();
    return res.status(200).json({
      success: true,
      data: newUser[0],
    });
  } else if (req.method === "GET") {
    const userId = req.query["userId"];
    if (userId == null || typeof userId !== "string")
      res
        .status(400)
        .json({ success: false, message: "error in userId query param" });
    try {
      const user: User[] = await dbClient
        .select()
        .from(users)
        .where(eq(users.id, userId as string));
      res.status(200).json({
        success: true,
        data: user[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }
}
