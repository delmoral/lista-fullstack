import { Product } from './product';

export class List {
    _id: string;
    name: string;
    products: Product[];
    key: string;

    constructor(_id = "", name ="", products = [], key = "") {
        this._id = _id;
        this.name = name;
        this.products = products;
        this.key = key;
    }
}
