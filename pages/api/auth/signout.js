import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "GET") return;

  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      serialize("token", "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
      })
    )
    .json({});
}
