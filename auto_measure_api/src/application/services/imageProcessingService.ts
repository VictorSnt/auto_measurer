import { UploadAndProcessImageResponse } from '../usecases/uploadAndProcessImage';
import { ImageReader } from '../interfaces/imageReader';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs/promises';
import { ImgBBUploader } from '../../adapters/services/imgBBfileStorageService';

export class ImageProcessingService {
  constructor(
    private readonly imageReader: ImageReader,
    private readonly imgBBFileStorage: ImgBBUploader
    ) {}

  outputDir = path.join(__dirname, '../../test/')
  async processImage(base64Image: string):
    Promise<UploadAndProcessImageResponse> {
    const imgBuffer = this.validateImageType(base64Image);
    const path = await this.saveJPEGBuffer(imgBuffer);
    const response = await this.imageReader.uploadAndReadImage(path);
    //const fileUrl = await this.imgBBFileStorage.uploadImage(path);
    // response.imageUrl = fileUrl; #In production we get link from file storage
    await this.deleteImage(path)
    return response
  }

  private validateImageType(base64Image: string): Buffer {
    if (!base64Image) {
      throw new Error('No image base64 string provided.');
    }

    const buffer = this.decodeBase64(base64Image);

    const fileType = this.getFileType(buffer);
    if (!fileType || !['png', 'jpeg', 'jpg'].includes(fileType)) {
      throw new Error(
        'Invalid image file type. Only PNG and JPEG are allowed.'
      );
    }

    return buffer
  }

  private decodeBase64(base64String: string): Buffer {
    let formatedBase64String = base64String.split(",")[1] || base64String;
    const buffer = Buffer.from(formatedBase64String, 'base64');
    return buffer;
  }

  private getFileType(buffer: Buffer): string | null {
    const signatures: { [key: string]: string } = {
      '89504e47': 'png',
      'ffd8ffe0': 'jpeg',
      'ffd8ffe1': 'jpeg',
      'ffd8ffe2': 'jpeg',
      'ffd8ffe3': 'jpeg',
      'ffd8ffe8': 'jpeg',
    };

    const signature = buffer.toString('hex', 0, 4);
    return signatures[signature] || null;
  }

  private async saveJPEGBuffer(imgBuffer: Buffer): Promise<string> {
    const fileName = `image-${Date.now()}.jpeg`;
    const filePath = path.join(this.outputDir, fileName);

    try {
      await sharp(imgBuffer)
        .toFormat('jpeg')
        .toFile(filePath);
    } catch (error: any) {
      throw new Error(`Failed to save image: ${error.message}`);
    }
    return filePath;
  }

  private async deleteImage(filePath: string): Promise<void> {
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.error(`File not found: ${filePath}`);
      } else {
        console.error(`Failed to delete file: ${error.message}`);
      }
    }
  }
}