import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import formidable from "formidable";
import getAPI from "@/util/getAPI";

type LikeResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikeResBody>
) {
  const { method } = req;
  const API = getAPI();

  switch (method) {
    case "PUT":
      try {
        const token = req.headers.authorization?.split(" ")[1];
        const { post_id } = req.query;
        const response = await axios({
          method: "PUT",
          url: `${API}/like/${post_id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          return res.status(200).json({});
        } else {
          return res.status(400).json({ message: "" });
        }
      } catch (e) {
        return res.status(500).json({ message: "Internal server error" });
      }
      break;
    case "DELETE":
      try {
        const token = req.headers.authorization?.split(" ")[1];
        const { post_id } = req.query;
        const response = await axios({
          method: "DELETE",
          url: `${API}/like/${post_id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          return res.status(200).json({});
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
