import { IOrder } from "./order.interface";
import { OrderState } from "./order_state.enum";

export class Order implements IOrder{
    orderID: number;
    clientID: number;
    estimate: number;
    state: OrderState;
    title: string;
    limit: Date;

    constructor(){
        this.orderID = -1;
        this.clientID = -1;
        this.estimate = -1;
        this.title = "Unknown"
        this.limit = new Date()
        this.state = OrderState.STOPPED
    }

}