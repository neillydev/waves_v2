import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cookies from 'js-cookie';
import getAPI from '@/util/getAPI';

type LogoutResBody = {
    message?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LogoutResBody>
) {
    const { method } = req;
    const API = getAPI();

    switch (method) {
        case "POST":

            try {
                const token = req.headers.authorization?.split(' ')[1];
                const response = await axios.post(`${API}/auth/logout`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 201) {
                    return res.status(201).json({message: 'Logout successful'});
                } else {
                    return res.status(400).json({ message: '' });
                }
            } catch (e) {

                return res.status(500).json({ message: 'Internal server error' });
            }
        default:

            break;
    }
}
