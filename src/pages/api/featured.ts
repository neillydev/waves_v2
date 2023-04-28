import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type FeaturedResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FeaturedResBody>
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const response = await axios.get(`http://localhost:8022/featured`);
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
