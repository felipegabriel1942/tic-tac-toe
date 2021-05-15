import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal: ElementRef;

  subscriptions$: Subscription[] = [];

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.openModal();
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

  openModal(): void {
    const subscription$ = this.modalService.onOpenModal.subscribe(() => {
      this.modal.nativeElement.style.display = 'block';
    });

    this.subscriptions$.push(subscription$);
  }

  @HostListener('document:click', ['$event'])
  click(event): void {
    if (event.target === this.modal.nativeElement) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.modal.nativeElement.style.display = 'none';
  }
}
