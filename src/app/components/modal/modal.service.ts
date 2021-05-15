import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  onOpenModal = new Subject<any>();
  onCloseModal = new Subject<any>();

  openModal(): void {
    this.onOpenModal.next();
  }

  closeModal(): void {
    this.onCloseModal.next();
  }
}
