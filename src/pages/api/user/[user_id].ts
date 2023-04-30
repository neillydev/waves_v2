import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import getAPI from "@/util/getAPI";

type ProfileResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileResBody>
) {
  const { method } = req;
  const API = getAPI();

  switch (method) {
    case "PUT":
      try {
        const { user_id } = req.query;
        const token = req.headers.authorization?.split(' ')[1];
        const header: any = token ? { Authorization: `Bearer ${token}` } : {};
        const {email} = JSON.parse(req.body);
        
        const response = await axios.put(`${API}/account/@${user_id}`, {
          email: email
        },{
          headers: {...header}
        });

        if (response.status === 200) {
          const data = await response.data;

          return res.status(200).json(data);
        } else if (response.status === 301) {
          const data = await response.data;

          return res.status(301).json(data);
        } else {
          return res.status(400).json({ message: "" });
        }
      } catch (e) {
        return res.status(500).json({ message: "Internal server error" });
      }
      break;
    case "GET":
      try {
        const { user_id } = req.query;
        const token = req.headers.authorization?.split(' ')[1];
        const header: any = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await axios.get(`${API}/user/@${user_id}`, {
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
