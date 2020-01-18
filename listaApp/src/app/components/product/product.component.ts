import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  productos = [];
  idProductos: Array<String> = [];
  checked = false;

  @Input() listId: string;

  constructor(private productService: ProductService, private _snachBar: MatSnackBar) { }

  ngOnInit() {
    this.getProductsById();
  }

  getProducts(){
    this.productService.getProducts().subscribe(res =>{
      this.productos = res as Product[];
    })
  }

  async getProductsById(id?: string){
    this.productService.getProductsById(id || this.listId).subscribe(res =>{
      this.productos = res as Product[];
      this.idProductos = [];
      for(var i=0; i< this.productos.length; i++){
        this.idProductos[i] = this.productos[i]._id;
      }
    })
  }

  addProduct(form?: NgForm){
    form.value.listId = this.listId;

    if(form.value.name.length === 0){
      this._snachBar.open('Pon algún nombre al producto nuevo', null, {duration: 3000});
      return;
    }
    if(form.value.price == null){
      form.value.price = 0;
    }

    if(form.value._id){      
      this.productService.putProduct(form.value).subscribe(res =>{
        this.resetForm(form);
        this.getProductsById();
        this._snachBar.open('Producto actualizado', null, {
          duration: 3000
        })
      });
    } else{
      this.productService.postProduct(form.value).subscribe(res =>{
        this.resetForm(form);
        this.getProductsById();
        this._snachBar.open('Producto creado', null, {
          duration: 3000
        })
      });
    }
  }

  editProduct(product: Product){
    this.productService.selectedProduct = product;
  }

  deleteProduct(_id: string){

    //if(confirm('¿Borrar?')){
      this.productService.deleteProduct(_id).subscribe(res =>{
        this.getProductsById();
        this._snachBar.open('Producto eliminado', null, {
          duration: 3000
        })
      })
    //}
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
    this.productService.selectedProduct = new Product();
  }

  setColor(estado: boolean){
    if(estado){
      return "#f57f17"
    }
  }

}
