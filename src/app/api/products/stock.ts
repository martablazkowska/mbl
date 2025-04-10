/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import products from "server/services/products";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method Not Allowed" });

  const productId = req.query.productId;
  const quantity = req.query.quantity;

  if (!productId || !quantity)
    return res.status(400).json({ message: "Bad Request" });

  try {
    const stock = products.checkStock(+productId, +quantity);
    res
      .status(200)
      .json(stock ? { message: "In stock" } : { message: "Out of stock" });
  } catch (error: any) {
    if (error.message === "Product not found") {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}
