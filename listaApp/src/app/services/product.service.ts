import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly URL_API = 'http://localhost:3000/api/products'

  selectedProduct: Product;
  allProduct: Product[];

  constructor(private http: HttpClient) {
    this.selectedProduct = new Product();
   }

  getProducts(){
    return this.http.get(this.URL_API);
  }

  getProductsById(_id: string){
    return this.http.get(this.URL_API + `/list/${_id}`);
  }

  postProduct(product: Product){
    return this.http.post(this.URL_API, product);
  }

  putProduct(product: Product){
    return this.http.put(this.URL_API + `/${product._id}`, product);
  }

  deleteProduct(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
