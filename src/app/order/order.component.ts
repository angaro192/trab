import { Component, OnInit, Input } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from '../shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model';
import { OrderService } from './other.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
  numberPattern = /^[0-9]*$/
  orderForm: FormGroup
  // delivery: number = 8
  qtyProducts = this.totalQty()
  @Input() delivery: number = this.calcularFrete() // Testes de novo valor para o delivery

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value:'MON'},
    {label: 'Cartão de Credito', value:'DEB'},
    {label: 'Cartão Refeição', value:'REF'}
  ]

  constructor(private orderService: OrderService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({ // Inicializa o form aqui com os seus campos
      name: this.formBuilder.control('',[Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, {validator:OrderComponent.equalsTo})
  }

  // Validação personalizada
  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    // Validação do campo de e-mail
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if( !email || !emailConfirmation){
      return undefined
    }
    if( email.value !== emailConfirmation.value){
      return {emailsNotMatch: true}
    }
    return undefined
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  totalQty(): number {
    return this.orderService.totalQty()
  }

  calcularFrete(): number {
    return this.orderService.calcularFrete()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
    this.delivery = this.calcularFrete()
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
    this.delivery = this.calcularFrete()
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.orderItem = this.cartItems()
    .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
                              .subscribe((order: Order) => {
                                this.router.navigate(['/order-summary'])
                              })
  }

}
