// src/services/uploadToImgur.js
import axios from 'axios';

const IMGUR_CLIENT_ID = 'e4abbe89e1586ce';

export async function uploadToImgur(base64Image) {
  try {
    const res = await axios.post(
      'https://api.imgur.com/3/image',
      {
        image: base64Image.split(',')[1], // remove "data:image..." part
        type: 'base64',
      },
      {
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
      }
    );

    return res.data.data.link; // this is the public Imgur URL
  } catch (err) {
    console.error('Imgur upload failed:', err);
    return null;
  }
}
