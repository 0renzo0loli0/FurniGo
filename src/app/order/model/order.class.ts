import { IOrder } from "./order.interface";
import { OrderStatus } from "./order_state.enum";

export class Order implements IOrder{
    orderID: number;
    clientID: number;
    estimate: number;
    state: OrderStatus;
    title: string;
    limit: Date;
    details: string

    constructor(){
        this.orderID = -1;
        this.clientID = -1;
        this.estimate = -1;
        this.title = "Unknown"
        this.limit = new Date()
        this.details = "lorem ipsum dolor sit amet lore mauris et dolor sit"
        this.state = OrderStatus.STOPPED
    }

}