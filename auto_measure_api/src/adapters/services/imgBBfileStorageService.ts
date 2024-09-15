import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export class ImgBBUploader {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.imgbb.com/1/upload';
  }

  async uploadImage(imagePath: string): Promise<string> {
    try {
      const form = new FormData();
      form.append('image', fs.createReadStream(imagePath));
      form.append('key', this.apiKey);

      const response = await axios.post(this.apiUrl, form, {
        headers: {
          ...form.getHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data && response.data.data && response.data.data.url) {
        return response.data.data.url;
      } else {
        throw new Error('Erro ao obter o link da imagem.');
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  }
}
