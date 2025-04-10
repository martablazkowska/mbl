import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import user from "@/lib/server/services/user";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const login = req.body.login;
  const password = req.body.password;

  if (!login || !password)
    return res.status(400).json({ message: "Bad Request" });

  try {
    const loggedInUser = user.logUserIn(login, password);
    const userData = {
      userId: loggedInUser.userId,
      login: login,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
    };

    const cookie = serialize("user", JSON.stringify(userData), {
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie);
    res.status(200).json(userData);
  } catch (error: any) {
    if (error.message === "Login or password is incorrect") {
      return res.status(401).json({ message: error.message });
    }

    if (error.message === "Another user is already logged in") {
      return res.status(403).json({ message: error.message });
    }

    if (error.message === "User is already logged in") {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}
