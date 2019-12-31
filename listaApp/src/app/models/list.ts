export class List {
    _id: string;
    name: string;
    products: string[];

    constructor(_id = "", name ="", products = []) {
        this._id = _id;
        this.name = name;
        this.products = products;
    }
}
