import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() value: any;
  @Output() response: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    //   this.response.emit({ response: true, value: this.value });
    this.response.emit(this.value);
  }

}
