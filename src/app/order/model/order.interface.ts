import { OrderState } from "./order_state.enum"

export interface IOrder {
    orderID: number
    clientID: number
    estimate: number
    title: string
    limit: Date
    state: OrderState
}