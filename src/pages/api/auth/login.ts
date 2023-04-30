import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cookies from 'js-cookie';
import getAPI from '@/util/getAPI';

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
  const API = getAPI();

  switch(method) {
    case "POST":
      const { login, password }: LoginReqBody = req.body;
      try{
        const response = await axios.post(`${API}/auth/login`, {
          login,
          password,
        });

        if(response.status === 200){
          const data = await response.data;

          //@ts-ignore
          const [cookie] = response.headers['set-cookie'];
          
          return res.status(200).json(data);
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
