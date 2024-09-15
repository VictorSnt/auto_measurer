import { ENV } from '../environment/variables';
import { Measurement } from './measureServiceInterfaces';

export class ImgStorageService {
  static saveImage(key: string, imageBase64: string): void {
    if (ENV !== 'production') {
      localStorage.setItem(key, imageBase64);
    }
  }

  static getImage(measurement: Measurement): string {
    if (ENV !== 'production') {
      const img = localStorage.getItem(measurement.measure_uuid) || '';
      return img;
    }
    return measurement.image_url;
  }
}