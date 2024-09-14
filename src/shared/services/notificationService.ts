import Swal from 'sweetalert2';

export class Toaster {
  notify: Notify;
  dialog: Dialog;

  constructor() {
    this.dialog = new Dialog();
    this.notify = new Notify();
  }
}

class Notify {
  sucess(title: string, message: string) {
    Swal.fire({
      icon: 'success',
      text: message,
      title: title
    });
  }

  error(title: string, message: string) {
    Swal.fire({
      icon: 'error',
      text: message,
      title: title
    });
  }

  info(title: string, message: string) {
    Swal.fire({
      icon: 'info',
      text: message,
      title: title
    });
  }
}

class Dialog {
  show(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Concluido!',
          icon: 'success'
        });
      }
    });
  }
} 