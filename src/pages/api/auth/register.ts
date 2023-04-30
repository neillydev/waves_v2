import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import getAPI from '@/util/getAPI';

type RegisterReqBody = {
  email: string;
  username: string;
  password: string;
};

type RegisterResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResBody>
) {
  const { method } = req;
  const API = getAPI();

  switch (method) {
    case "POST":
      const { email, username, password }: RegisterReqBody = req.body;


      try {
        const response = await axios.post(`${API}/auth/register`, {
          username,
          email,
          password,
        });

        if (response.status === 200) {
          return res.status(200).json({

          });
        } else {
          return res.status(400).json({ message: '' });
        }
      } catch (e) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      break;
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
