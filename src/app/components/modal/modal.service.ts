import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  onOpenModal = new Subject<any>();
  onCloseModal = new Subject<any>();

  openModal(id: string): void {
    this.onOpenModal.next(id);
  }

  closeModal(id: string): void {
    this.onCloseModal.next(id);
  }
}
