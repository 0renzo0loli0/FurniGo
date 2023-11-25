import { OrderStatus } from "./order_state.enum";

export class OrderEntity{
    id: number = -1;
    clientID: number = -1;
    estimate: number = -1;
    state: OrderStatus = OrderStatus.INLINE;
    title: string = "Unknown";
    limit: Date = new Date();
    details: string = "Unknown"

    constructor(){
        this.id = -1;
        this.clientID = -1;
        this.estimate = -1;
        this.title = "Unknown"
        this.limit = new Date()
        this.details = "lorem ipsum dolor sit amet lore mauris et dolor sit"
        this.state = OrderStatus.INLINE
    }

    static fromObj(obj: any) : OrderEntity{
        let nOrder = new OrderEntity();
        nOrder.clientID = obj.clientID;
        nOrder.id = obj.id;
        nOrder.estimate = obj.estimate;
        nOrder.title = obj.title;
        nOrder.state = obj.state;
        nOrder.limit = new Date(obj.limit);
        nOrder.details = obj.details;
        return nOrder;
    }
}
