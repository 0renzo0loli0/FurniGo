export class OfferEntity {
    id: number = -1;
    orderID: number = -1;
    expertID: number = -1;
    price: number = 0;
    accepted: boolean = false;
    limit: Date = new Date();

    constructor(){}

    static fromObj(obj: any) : OfferEntity{
        let nOffer = new OfferEntity();
        nOffer.id = obj.id;
        nOffer.orderID = obj.orderID;
        nOffer.expertID = obj.expertID;
        nOffer.accepted = obj.accepted;
        nOffer.limit = obj.limit;
        nOffer.price = obj.price;
        return nOffer;
    }
}
