import { revenue } from "@/pages/schema/revenue";
import { APIResponse } from "@/pages/shared/apiresponse";
import corsWrapper from "@/pages/shared/cors";
import { dbClient } from "@/pages/shared/dbClient";
import handleDefault from "@/pages/shared/defaultRequestHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) {
  await corsWrapper(req, res);
  switch (req.method) {
    case "GET":
      await getRevenue(req, res);
      break;
    default:
      handleDefault(res);
  }
}

async function getRevenue(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) {
  const revenues = await dbClient.select().from(revenue);
  res.status(200).json({
    success: true,
    data: revenues,
  });
}
