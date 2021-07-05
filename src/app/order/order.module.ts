import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { DeliveryCostsComponent } from "./delivery-costs/delivery-costs.component";
import { OrderItemsComponent } from "./order-items/order-items.component";
import { OrderComponent } from "./order.component";
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '', component: OrderComponent}
]

@NgModule({
  declarations: [OrderItemsComponent, OrderComponent, DeliveryCostsComponent],
  imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class OrderModule {}