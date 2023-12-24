import { Car, cars } from "@/pages/schema/cars";
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
    const car: Car[] = await dbClient.select().from(cars);
    res.status(200).json({
      success: true,
      data: car,
    });
  }
}
