import type { NextApiRequest, NextApiResponse } from "next";
import cart from "@/lib/server/services/cart";
import { ICartItem } from "@/lib/server/models/carts";
import products from "@/lib/server/services/products";

const acceptedMethods = ["GET", "POST", "DELETE"];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.method || !acceptedMethods.includes(req.method))
    return res.status(405).json({ message: "Method Not Allowed" });

  if (req.method === "GET") {
    const { userId } = req.query;

    if (!userId) return res.status(400).json({ message: "Bad Request" });

    try {
      const cartItems = cart.getCart(+userId);

      const items = cartItems.map(({ productId, quantity }) => ({
        quantity: quantity,
        ...products.getSingleProduct(productId),
      }));
      res.status(200).json(items);
    } catch (error: any) {
      if (error.message === "Cart not found") {
        return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  if (req.method === "POST") {
    const { user } = req.cookies;
    const cartItem = req.body.cart;

    if (!user || !cartItem)
      return res.status(400).json({ message: "Bad Request" });

    const { userId } = JSON.parse(user);

    let cartItems: ICartItem[] = [];
    try {
      cartItems = cart.getCart(+userId);
    } catch (error) {}

    try {
      const foundIndex = cartItems.findIndex(
        ({ productId }) => productId === cartItem.productId
      );
      if (foundIndex > -1)
        cartItems[foundIndex] = {
          ...cartItem,
          quantity: cartItems[foundIndex].quantity + cartItem.quantity,
        };
      else cartItems.push(cartItem);

      cart.updateCart(+userId, cartItems);
      res.status(200).json({ message: "Cart updated" });
    } catch (error: any) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  if (req.method === "DELETE") {
    const userId = req.query.userId;

    if (!userId) return res.status(400).json({ message: "Bad Request" });

    try {
      cart.clearCart(+userId);
      res.status(200).json({ message: "Cart cleared" });
    } catch (error: any) {
      if (error.message === "Cart not found") {
        return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
