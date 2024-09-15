import axios, { AxiosResponse } from 'axios';
import { AppUrl } from '../environment/variables';
import {
  ConfirmMeasurePayloadRequest, ConfirmMeasurePayloadResponse, ConfirmService,
  CreateMeasurePayloadRequest, CreateMeasurePayloadResponse,
  MeasureListPayloadResponse,
  MeasureService
} from './measureServiceInterfaces';


export class CreateMeasureService implements MeasureService {
  private readonly url: string = `${AppUrl}/upload`;

  constructor(private payload: CreateMeasurePayloadRequest) { }

  async getMeasure(): Promise<CreateMeasurePayloadResponse | null> {
    try {
      const response:
        AxiosResponse<CreateMeasurePayloadResponse> = (
          await axios.post(this.url, this.payload)
        );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      genericErrorHandler(error);
      return null;
    }
  }
}


export class ConfirmMeasureService implements ConfirmService {
  private readonly url: string = `${AppUrl}/confirm`;

  constructor(private payload: ConfirmMeasurePayloadRequest) { }

  async confirmMeasure(): Promise<ConfirmMeasurePayloadResponse | null> {
    try {
      const response: AxiosResponse<
        ConfirmMeasurePayloadResponse
      > = await axios.patch(
        this.url, this.payload
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error: unknown) {
      genericErrorHandler(error);
      return null;
    }
  }
}


export class ListCustomerMesures {
  private url = `${AppUrl}/customer_uuid/list`;

  async getMeasures(customerId: string, filter: string|boolean =false):
    Promise<MeasureListPayloadResponse | null> {
    try {
      this.url = this.url.replace('customer_uuid', customerId);
      if (filter) {
        this.url += filter;
      }
      const response: AxiosResponse<
        MeasureListPayloadResponse
      > = await axios.get(
        this.url
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error: unknown) {
      genericErrorHandler(error);
      return null;
    }
  }
}


const genericErrorHandler = (error: unknown): never => {
  console.error(error);
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const errorMessage = (
        error.response.data?.error_description ||
        'An unknown error occurred'
      );
      throw new Error(errorMessage);
    }
  }
  throw new Error('Unexpected error occurred');
};

