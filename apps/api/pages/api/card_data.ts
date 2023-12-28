import { invoices } from "@/pages/schema/invoices";
import { APIResponse } from "@/pages/shared/apiresponse";
import corsWrapper from "@/pages/shared/cors";
import { dbClient } from "@/pages/shared/dbClient";
import handleDefault from "@/pages/shared/defaultRequestHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { count, eq } from "drizzle-orm";
import { customers } from "@/pages/schema/customers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) {
  await corsWrapper(req, res);

  switch (req.method) {
    case "GET":
      await getCardData(req, res);
      break;
    default:
      handleDefault(res);
  }
}

async function getCardData(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) {
  const numberOfInvoices = await dbClient
    .select({ value: count() })
    .from(invoices);
  const numberOfCustomers = await dbClient
    .select({ value: count() })
    .from(customers);
  const totalPaidInvoices = await dbClient
    .select({ value: count() })
    .from(invoices)
    .where(eq(invoices.status, "paid"));
  const totalPendingInvoices = await dbClient
    .select({ value: count() })
    .from(invoices)
    .where(eq(invoices.status, "pending"));

  console.log(numberOfInvoices[0]!.value);

  res.status(200).json({
    success: true,
    data: {
      numberOfInvoices: numberOfInvoices[0]!.value,
      numberOfCustomers: numberOfCustomers[0]!.value,
      totalPaidInvoices: totalPaidInvoices[0]!.value,
      totalPendingInvoices: totalPendingInvoices[0]!.value,
    },
  });
}
