import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

const reg = '^https://.*';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {

  @ViewChild('objRef') objRef: ElementRef;

  orderForm: FormGroup = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number>(0, [Validators.min(0), Validators.required]),
    limit: new FormControl<Date>(new Date(), [Validators.required]),
    details: new FormControl<string>('', [Validators.required]),
    objPath: new FormControl('', [Validators.pattern(reg), Validators.required])
  });

  @Input() leftButtonTitle: string = "Left Button"
  @Output() leftButtonAction: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() rightButtonTitle: string = "Right Button"
  @Output() rightButtonAction: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Input() set disableControls(controls: Array<'title' | 'limit' | 'price' | 'details' | 'objPath'>) {
    for (let control of controls) {
      this.orderForm.controls[control].disable()
    }
  }

  get title(): AbstractControl {
    return this.orderForm.controls['title']
  }

  @Input() set title(nTitle: string) {
    this.orderForm.controls['title'].setValue(nTitle)
  }

  get price(): AbstractControl {
    return this.orderForm.controls['price']
  }

  @Input() set price(nPrice: number) {
    this.orderForm.controls['price'].setValue(nPrice)
  }

  get limit(): AbstractControl {
    return this.orderForm.controls['limit']
  }

  @Input() set limit(nLimit: Date) {
    this.orderForm.controls['limit'].setValue(nLimit)
  }

  get details(): AbstractControl {
    return this.orderForm.controls['details']
  }

  @Input() set details(nDetails: string) {
    this.orderForm.controls['details'].setValue(nDetails)
  }

  get objPath(): AbstractControl {
    return this.orderForm.controls['objPath']
  }

  @Input() set objPath(nObjPath: string) {
    this.orderForm.controls['objPath'].setValue(nObjPath)
  }

  onLeftClick(_: Event) {
    if (this.orderForm.valid)
      this.leftButtonAction.emit(this.orderForm)
  }

  onRightClick(_: Event) {
    _.preventDefault()
    this.rightButtonAction.emit(this.orderForm)
  }

  @Output() afterTyping: EventEmitter<string> = new EventEmitter()

  ngAfterViewInit() {
    fromEvent<Event>(this.objRef.nativeElement, 'input')
      .pipe(map(event => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(data => {
        if (this.orderForm.controls['objPath'].valid)
          this.afterTyping.emit(data);
      })
  }

}
