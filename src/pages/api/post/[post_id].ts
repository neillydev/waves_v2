import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import formidable from "formidable";

type PostResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResBody>
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { post_id } = req.query;
        const response = await axios({
          method: "GET",
          url: `http://localhost:8022/post/${post_id}`,
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
    case "DELETE":
      try {
        const { post_id } = req.query;
        const response = await axios({
          method: "DELETE",
          url: `http://localhost:8022/post/${post_id}`,
        });

        if (response.status === 201) {
          return res.status(201);
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
export const config = {
  api: {
    bodyParser: false,
  },
};
