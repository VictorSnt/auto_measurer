import { ConfirmMeasureService } from '../shared/services/measureService';
import { Toaster } from '../shared/services/notificationService';

export class ConfirmMeasureUsecase {
  private toaster: Toaster;

  constructor() {
    this.toaster = new Toaster();
  }

  async execute(measure_uuid: string, confirmationValue: string) {
    const payload = {
      measure_uuid: measure_uuid,
      confirmed_value: parseInt(confirmationValue, 10),
    };
    const service = new ConfirmMeasureService(payload);
    try {
      const response = await service.confirmMeasure();
      this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleResponse(response: any) {
    if (response?.success) {
      this.toaster.notify.success(
        'Confirmado',
        'Confirmação registrada com sucesso'
      );
    } else {
      this.toaster.notify.error(
        'Oops',
        'Erro ao confirmar medição, tente novamente'
      );
    }
  }

  private handleError(error: any) {
    const errorMessage = error instanceof Error ?
      error.message :
      'Ocorreu um erro inesperado';
    this.toaster.notify.error('Oops', errorMessage);
  }

  static async handleCancel() {
    const toaster = new Toaster();
    const userConfirmed = await toaster.dialog.show(
      'Atenção',
      'Quer mesmo cancelar a confirmação?'
    );

    if (userConfirmed) {
      window.location.reload();
    }
  }
}
