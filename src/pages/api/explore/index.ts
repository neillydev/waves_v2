import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type ExploreResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExploreResBody>
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { q } = req.query;

        const response = await axios({
          method: "GET",
          url: `http://localhost:8022/search/${q}`,
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
    default:
      break;
  }
};