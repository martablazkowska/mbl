/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import blog from "server/services/blog";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Allowed" });

  try {
    res.status(200).json(blog.getBlogList());
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
