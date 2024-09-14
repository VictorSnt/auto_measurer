import { Base64Service } from '../shared/services/base64Service';
import { CreateMeasureService } from '../shared/services/measureService';

interface CreateMeasureUseCaseProps {
  measure_type: string
  file: File,
  responseSetter: CallableFunction
}

export class CreateMeasureUseCase {
  static execute = async (props: CreateMeasureUseCaseProps) => {
    const payload = {
      image: await Base64Service.convertToBase64(props.file),
      customer_code: 'string45',
      measure_datetime: new Date(),
      measure_type: props.measure_type
    };
    const service = new CreateMeasureService(payload);
    const response = await service.getMeasure();
    props.responseSetter(response);
  };
}