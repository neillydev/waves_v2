import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import multiparty from 'multiparty';
import getAPI from '@/util/getAPI';
import fs from 'fs';

type UploadReqBody = {
  caption: string;
  access: string;
  user_id: string;
  file: File;
  username: string;
  token: string;
};

type UploadResBody = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResBody>
) {
  const form = new multiparty.Form();
  const { method } = req;
  const API = getAPI();

  switch (method) {
    case "POST":
      form.parse(req, async (err, fields: any, files: any) => {
          if (err) {
            console.error('Error parsing form data:', err);
            res.status(500).end();
            return;
          }
      
        console.log(files)

        const videoFile = files.file[0];
        const videoContent = fs.readFileSync(videoFile.path);

    //reader.onload = async () => {
      const blob = new Blob([videoContent], { type: videoFile.originalFilename.split('.')[1] });

        const formData = new FormData();
        const { token, username, user_id, caption, access }: any = fields;
        const header: any = token ? { Authorization: `Bearer ${token}` } : {};
        formData.append('file', blob, videoFile.originalFilename);
        formData.append('token', token);
        formData.append('user_id', user_id);
        formData.append('caption', caption);
        formData.append('access', access);

        try {
          const response = await axios({
            method: 'POST',
            url: `${API}/post`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data", ...header },
          });

          if (response.status === 200) {
            const data = await response.data;

            return res.status(200).json(data);
          } else {
            return res.status(400).json({ message: '' });
          }
        } catch (e) {

          return res.status(500).json({ message: 'Internal server error' });
        }
      //};
      })
      break;
    default:

      break;
  }
}
export const config = {
  api: {
    bodyParser: false
  },
}