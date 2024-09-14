import axios from 'axios';
import { AppUrl } from '../environment/variables';

export interface CreateMeasurePayloadRequest {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: string;
}

export interface CreateMeasurePayloadResponse {
  image_url: string;
  measure_value: string;
  measure_uuid: string;
}

export interface ConfirmMeasurePayloadRequest {
  measure_uuid: string
  confirmed_value: number
}

export interface ConfirmMeasurePayloadResponse {
  success: boolean
}


export class CreateMeasureService {
  private payload: CreateMeasurePayloadRequest;
  private readonly url: string = `${AppUrl}/upload`;

  constructor(createMeasurePayload: CreateMeasurePayloadRequest) {
    this.payload = createMeasurePayload;
  }

  async getMeasure(): Promise<CreateMeasurePayloadResponse> {
    try {
      const response = await axios.post(this.url, this.payload);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = (
            error.response.data?.error_description ||
            'An unknown error occurred'
          );
          throw new Error(errorMessage);
        }
      }
      console.error(error);
      throw new Error('Erro inesperado ao ler imagem');
    }
  }

}


export class ConfirmMeasurement {
  private payload: ConfirmMeasurePayloadRequest;
  private readonly url: string = `${AppUrl}/confirm`;

  constructor(confirmMeasurePayload: ConfirmMeasurePayloadRequest) {
    this.payload = confirmMeasurePayload;
  }

  async confirmMeasure(): Promise<ConfirmMeasurePayloadResponse> {
    try {
      const response = await axios.patch(this.url, this.payload);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = (
            error.response.data?.error_description ||
            'An unknown error occurred'
          );
          throw new Error(errorMessage);
        }
      }
      console.error(error);
      throw new Error('Erro inesperado ao ler imagem');
    }
  }
}