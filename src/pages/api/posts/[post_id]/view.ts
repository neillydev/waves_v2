import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import getAPI from "@/util/getAPI";

type PostsResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostsResBody>
) {
  const { method } = req;
  const API = getAPI();

  switch (method) {
    case "POST":
      try {
        const token = req.headers.authorization?.split(" ")[1];
        const { post_id } = req.query;
        const response = await axios.post(`${API}/posts/${post_id}/view`,{},{
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