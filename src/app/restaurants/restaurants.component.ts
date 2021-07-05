import { Component, OnInit } from '@angular/core';

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurant/restaurant.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[]

  constructor(private restaurantsService: RestaurantService) { }

  ngOnInit() {
    this.restaurantsService.restaurantes().subscribe(restaurants => this.restaurants = restaurants)
  }

}
