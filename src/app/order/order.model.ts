class Order {
  constructor(
    public id: number,
    public address: string,
    public number: number,
    public optionalAdress: string,
    public paymentOption: string,
    public orderItem: OrderItem[] = []
  ) {}
}

class OrderItem {
  constructor(public quantity: number, public menuId: string) {  }
}

export { Order, OrderItem}