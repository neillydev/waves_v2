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
    case "GET":
      try {
        const { user_id } = req.query;
        const token = req.headers.authorization?.split(' ')[1];
        const header: any = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await axios.get(`${API}/posts`, {
          headers: {...header}
        });

        if (response.status === 200) {
          const data = await response.data;

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
