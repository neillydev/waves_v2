import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type PostsResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostsResBody>
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const token = req.headers.authorization?.split(" ")[1];
        const response = await axios.get('http://localhost:8022/posts/followers',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const { data } = await response;

          return res.status(200).json(data);
        } else {
          return res.status(400).json({ message: "" });
        }
      } catch (e) {
        return res.status(500).json({ message: "Internal server error" });
      }
      break;
    default:
      break;
  }
}