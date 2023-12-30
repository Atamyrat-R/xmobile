import { customers } from "@/pages/schema/customers";
import { invoices } from "@/pages/schema/invoices";
import { APIResponse } from "@/pages/shared/apiresponse";
import corsWrapper from "@/pages/shared/cors";
import { dbClient } from "@/pages/shared/dbClient";
import handleDefault from "@/pages/shared/defaultRequestHandler";
import { desc, eq, ilike, or } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const ITEMS_PER_PAGE = 6;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) {
  await corsWrapper(req, res);

  switch (req.method) {
    case "GET":
      await getInvoices(req, res);
      break;
    default:
      handleDefault(res);
  }
}

async function getInvoices(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>,
) {
  const { query, currentPage } = req.query;
  const offset = (Number(currentPage) - 1) * ITEMS_PER_PAGE;

  const invoicesData = await dbClient
    .select({
      id: invoices.id,
      amount: invoices.amount,
      date: invoices.date,
      status: invoices.status,
      name: customers.name,
      email: customers.email,
      image_url: customers.image_url,
    })
    .from(invoices)
    .innerJoin(customers, eq(invoices.customer_id, customers.id))
    .where(
      or(
        ilike(customers.name, `%${query}%`),
        ilike(customers.email, `%${query}%`),
        // ilike(invoices.amount, `%${query}%`),
        // ilike(invoices.date, `%${query}%`),
        // ilike(invoices.status, `%${query}%`)
      ),
    )
    .orderBy(desc(invoices.date))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  res.status(200);
  res.json({
    success: true,
    data: invoicesData,
  });
}
