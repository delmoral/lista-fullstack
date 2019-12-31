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
  checked = false;

  @Input() listId: string;

  constructor(private productService: ProductService, private _snachBar: MatSnackBar) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(res =>{
      this.productos = res as Product[];
    })
  }

  addProduct(form?: NgForm){
    form.value.listId = this.listId;
console.log(form.value);;

    if(form.value._id){      
      this.productService.putProduct(form.value).subscribe(res =>{
        this.resetForm(form);
        this.getProducts();
        this._snachBar.open('Producto actualizado', null, {
          duration: 3000
        })
      });
    } else{
      this.productService.postProduct(form.value).subscribe(res =>{
        this.resetForm(form);
        this.getProducts();
        this._snachBar.open('Producto creado', null, {
          duration: 3000
        })
      });
    }
    
    /*
    console.log(this.listId);
    form.value.listId = this.listId;
    console.log(form.value);
    */
  }

  editProduct(product: Product){
    this.productService.selectedProduct = product;
  }

  deleteProduct(_id: string){
    if(confirm('¿Borrar?')){
      this.productService.deleteProduct(_id).subscribe(res =>{
        this.getProducts();
        this._snachBar.open('Producto eliminado', null, {
          duration: 3000
        })
      })
    }
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
    this.productService.selectedProduct = new Product();
  }

  setColor(estado: boolean){
    if(estado){
      return "#311b92"
    }
  }

}
