export class Product {
    _id: string;
    name: string;
    price: number;

    constructor(_id="", name="", price= 0) {
        this._id = _id;
        this.name = name;
        this.price = price;
    }
}
