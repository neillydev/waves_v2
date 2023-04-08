import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type FollowReqBody = {
  following_username: string;
};

type FollowResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FollowResBody>
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const token = req.headers.authorization?.split(' ')[1];
        const { following_username }: FollowReqBody = req.body;
        
        const response = await axios.post("http://localhost:8022/follow", {following_username: following_username}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
