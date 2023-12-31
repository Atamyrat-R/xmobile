import { NewUser, User, users } from "@/pages/schema/users";
import { APIResponse } from "@/pages/shared/apiresponse";
import corsWrapper from "@/pages/shared/cors";
import { dbClient } from "@/pages/shared/dbClient";
import handleDefault from "@/pages/shared/defaultRequestHandler";
import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) {
  await corsWrapper(req, res);
  switch (req.method) {
    case "POST":
      await createUser(req, res);
      break;
    case "GET":
      await getUser(req, res);
      break;
    default:
      handleDefault(res);
  }
}

async function createUser(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) {
  const { email, name, password }: NewUser = req.body;
  if (email == null || name == null)
    return res.status(400).json({
      success: false,
      message: "either email or name not provided in the user body",
    });
  try {
    const newUser = await dbClient
      .insert(users)
      .values({ name, email, password })
      .returning();
    return res.status(200).json({
      success: true,
      data: newUser[0],
    });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}

async function getUser(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
  const userId = req.query["userId"];
  if (userId == null || typeof userId !== "string")
    return res
      .status(400)
      .json({ success: false, message: "error in userId query param" });
  try {
    const user: User[] = await dbClient
      .select()
      .from(users)
      .where(eq(users.id, userId as string));
    return res.status(200).json({
      success: true,
      data: user[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
}
