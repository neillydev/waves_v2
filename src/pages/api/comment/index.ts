import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import getAPI from "@/util/getAPI";

type CommentReqBody = {
  post_id: number;
  comment: string;
  username: string;
};
type DeleteCommentReqBody = {
  comment_id: number;
};

type CommentResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentResBody>
) {
  const { method } = req;
  const API = getAPI();

  switch (method) {
    case "POST":
      try {
        const token = req.headers.authorization?.split(' ')[1];
        const { post_id, comment, username }: CommentReqBody = JSON.parse(req.body);
        const response = await axios.post(`${API}/comment`, { post_id: post_id, comment: comment, username: username},{
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
    case "DELETE":
      try {
        const token = req.headers.authorization?.split(' ')[1];
        const { comment_id }: DeleteCommentReqBody = JSON.parse(req.body);
        const response = await axios.delete(`${API}/comment/${comment_id}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          const { data } = await response;
          return res.status(201).json(data);;
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
