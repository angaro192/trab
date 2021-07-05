import { Component, OnInit, Input, Output } from '@angular/core';
import { Restaurant } from './restaurant.model'

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html'
})
export class RestaurantComponent implements OnInit {

  @Input() restaurant: Restaurant
  @Output() evtNome

  constructor() { }

  ngOnInit() {
  }

  exibirNome(event) {
    console.log(event)
  }

}
