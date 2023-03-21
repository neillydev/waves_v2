import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type LoginReqBody = {
  login: string;
  password: string;
};

type LoginResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResBody>
) {
  const {method} = req;

  switch(method) {
    case "POST":
      const { login, password }: LoginReqBody = req.body;

      try{
        const response = await axios.post('http://localhost:8022/auth/login', {
          login,
          password,
        });

        if(response.status === 200){
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

      break;
  }
}
