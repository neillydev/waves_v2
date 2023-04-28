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
    case "POST":
      try {
        const token = req.headers.authorization?.split(" ")[1];
        const { post_id } = req.query;
        const response = await axios.post(`http://localhost:8022/posts/${post_id}/view`,{},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          const { data } = await response;

          return res.status(201).json(data);
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