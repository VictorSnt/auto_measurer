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
  measure_uuid: string;
  confirmed_value: number;
}

export interface ConfirmMeasurePayloadResponse {
  success: boolean;
}


export interface MeasureService {
  getMeasure(): Promise<CreateMeasurePayloadResponse | null>;
}


export interface ConfirmService {
  confirmMeasure(): Promise<ConfirmMeasurePayloadResponse | null>;
}


export interface Measurement {
  measure_uuid: string,
  measure_datetime: Date,
  measure_type: string,
  has_confirmed: boolean,
  image_url: string
}

export interface MeasureListPayloadResponse {
  customer_code: string,
  measures: Measurement[]
}