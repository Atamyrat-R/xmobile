import runMiddleware from "@/pages/shared/cors";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  await runMiddleware(req, res);
  if (req.method === "POST") {
    res.status(200).json({ message: "POST request" });
  } else if (req.method === "GET") {
    res.status(200).json({ message: "GET request" });
  }
}
