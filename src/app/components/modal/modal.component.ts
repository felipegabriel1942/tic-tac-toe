import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  openModal(): void {
    this.modal.nativeElement.style.display = 'block';
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
