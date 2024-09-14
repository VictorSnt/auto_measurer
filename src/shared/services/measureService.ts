import axios, { AxiosError } from 'axios';

interface MeasurePayload {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: string;
}

export class MeasureService {
  private measurePayload: MeasurePayload;
  private readonly url: string = 'http://localhost:3000/upload';

  constructor(measurePayload: MeasurePayload) {
    this.measurePayload = measurePayload;
  }

  async getMeasure(): Promise<any> {
    try {
      const response = await axios.post(this.url, this.measurePayload);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = (
            error.response.data?.error_description ||
            'An unknown error occurred'
          );
          throw new Error(errorMessage);
        }
      }
      throw new Error('Erro inesperado ao ler imagem');
    }
  }
}
