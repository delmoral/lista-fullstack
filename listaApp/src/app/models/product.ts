export class Product {
    _id: string;
    name: string;
    price: number;
    listId: string;
    check: boolean;

    constructor(_id="", name="", price= 0, listId = "", check = false) {
        this._id = _id;
        this.name = name;
        this.price = price;
        this.listId = listId;
        this.check = check;
    }
}
