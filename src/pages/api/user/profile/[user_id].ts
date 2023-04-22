import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ProfileReqBody = {
  avatar: string | undefined;
  username: string | undefined;
};

type ProfileResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileResBody>
) {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        const { user_id } = req.query;
        const body: ProfileReqBody = req.body;
        const token = req.headers.authorization?.split(" ")[1];
        const header: any = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.post(
          `http://localhost:8022/user/@${user_id}`,
          body,
          {
            headers: { ...header },
          }
        );

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
