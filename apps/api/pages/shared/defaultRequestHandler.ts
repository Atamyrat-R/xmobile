import { APIResponse } from "@/pages/shared/apiresponse";
import { NextApiResponse } from "next";

export default function handleDefault(res: NextApiResponse<APIResponse>) {
  return res.status(500).json({ message: "Server error: method not allowed" });
}
