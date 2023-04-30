import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import getAPI from "@/util/getAPI";

type ReplyReqBody = {
  post_id: number;
  comment_id: number;
  comment: string;
  username: string;
};

type ReplyResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReplyResBody>
) {
  const { method } = req;
  const API = getAPI();

  switch (method) {
    case "POST":
      try {
        const token = req.headers.authorization?.split(' ')[1];
        const { post_id, comment, username, comment_id }: ReplyReqBody = JSON.parse(req.body);
        const response = await axios.post(`${API}/comment/${comment_id}/reply`, { post_id: post_id, comment: comment, username: username},{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
      return res.status(405).json({ message: "Method not allowed" });
  }
}
