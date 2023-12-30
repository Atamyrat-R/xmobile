import { customers } from "@/pages/schema/customers";
import { invoices } from "@/pages/schema/invoices";
import { APIResponse } from "@/pages/shared/apiresponse";
import corsWrapper from "@/pages/shared/cors";
import { dbClient } from "@/pages/shared/dbClient";
import handleDefault from "@/pages/shared/defaultRequestHandler";
import { desc, eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) {
  await corsWrapper(req, res);

  switch (req.method) {
    case "GET":
      await getLatestInvoices(req, res);
      break;
    default:
      handleDefault(res);
  }
}

async function getLatestInvoices(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) {
  const latestInvoices = await dbClient
    .select({
      amount: invoices.amount,
      name: customers.name,
      image_url: customers.image_url,
      email: customers.email,
      id: invoices.id,
    })
    .from(invoices)
    .innerJoin(customers, eq(invoices.customer_id, customers.id))
    .orderBy(desc(invoices.date))
    .limit(5);

  res.status(200).json({
    success: true,
    data: latestInvoices,
  });
}
