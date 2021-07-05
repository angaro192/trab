import { Restaurant } from "./restaurant.model";
import { MEAT_API } from "app/app.api";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import { MenuItem } from "../../restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantService {

  constructor(private http:Http) {}
  
  restaurantes(): Observable<Restaurant[]> {
      return this.http.get(`${MEAT_API}/restaurants`)
        .map( response => response.json())
  }
  
  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get(`${MEAT_API}/restaurants/${id}`)
      .map(response => response.json())
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
      .map(response => response.json())
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
      .map(response => response.json())
  }

}