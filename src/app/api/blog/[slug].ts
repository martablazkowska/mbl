/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import blog from "server/services/blog";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Allowed" });

  const slug = req.query.slug as string;

  if (!slug) return res.status(400).json({ message: "Bad Request" });

  try {
    res.status(200).json(blog.getSingeBlog(slug));
  } catch (error: any) {
    if (error.message === "Blog post not found") {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}
