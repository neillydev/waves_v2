import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import getAPI from "@/util/getAPI";

type ExploreResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExploreResBody>
) {
  const { method } = req;
  const API = getAPI();

  switch (method) {
    case "GET":
      try {
        const { q } = req.query;

        const response = await axios({
          method: "GET",
          url: `${API}/search/${q}`,
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