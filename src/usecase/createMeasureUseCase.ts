import { Base64Service } from '../shared/services/base64Service';
import { ImgStorageService } from '../shared/services/imgStorageService';
import { CreateMeasureService } from '../shared/services/measureService';

interface CreateMeasureUseCaseProps {
  measure_type: string
  file: File,
  responseSetter: CallableFunction
}

export class CreateMeasureUseCase {
  static execute = async (props: CreateMeasureUseCaseProps) => {
    const customerId = localStorage.getItem('customerId') || 'guest';
    const img = await Base64Service.convertToBase64(props.file);
    const payload = {
      image: img,
      customer_code: customerId,
      measure_datetime: new Date(),
      measure_type: props.measure_type
    };
    const service = new CreateMeasureService(payload);
    const response = await service.getMeasure();
    if (response?.measure_uuid) {
      ImgStorageService.saveImage(response?.measure_uuid, img);
    }
    props.responseSetter(response);
  };
}