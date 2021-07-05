import { Injectable } from "@angular/core"
import { NotificationService } from "app/shared/messages/notification.service"
import { MenuItem } from "../menu-item/menu-item.model"
import { CartItem } from "./cart-item.model"

@Injectable()
export class ShoppingCartService {

    constructor(private notificationService: NotificationService) {}

    items: CartItem[] = []

    clear(){
        this.items = []
    }

    addItem(item: MenuItem){
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)
        if (foundItem) {
            this.increaseQty(foundItem)
        }else {
            this.items.push(new CartItem(item))
        }
        this.notificationService.notify({message:`O Item ${item.name.toLocaleUpperCase()} foi adcionado ao carrinho`, type: 'error'})
    }

    totalQty(): number {
        return this.items.map(item => item.quantity).reduce((prev, value) => prev + value, 0)
    }

    increaseQty(item: CartItem){
        item.quantity = item.quantity + 1
    }

    decreaseQty(item: CartItem){
        item.quantity = item.quantity - 1
        if(item.quantity === 0){
            this.removeItem(item)
        }
    }

    removeItem(item: CartItem){
        this.items.splice(this.items.indexOf(item), 1)
        this.notificationService.notify({message: `O Item ${item.menuItem.name.toLocaleUpperCase()} foi removido do carrinho`, type: 'success'})
    }

    total(): number {
        return this.items.map(item => item.value()).reduce((prev, value) => prev + value, 0)
    }
}