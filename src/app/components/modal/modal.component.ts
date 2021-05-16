import {
  Component,
  ElementRef,
  HostListener,
  Input,
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
  @Input() closeButton = true;
  @Input() id: string;

  @ViewChild('modal') modal: ElementRef;

  subscriptions$: Subscription[] = [];

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    const openModal$ = this.modalService.onOpenModal.subscribe((id: string) => {
      if (this.id === id) {
        this.modal.nativeElement.style.display = 'block';
      }
    });

    const closeModal$ = this.modalService.onCloseModal.subscribe(
      (id: string) => {
        if (this.id === id) {
          this.closeModal();
        }
      }
    );

    this.subscriptions$.push(openModal$, closeModal$);
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((subscription) => subscription.unsubscribe());
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
