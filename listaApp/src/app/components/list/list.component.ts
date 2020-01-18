import { Component, OnInit, ViewChild } from '@angular/core';
import { ListService } from '../../services/list.service';
import { ProductService } from '../../services/product.service';

import { List } from 'src/app/models/list';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar'; 
import { Product } from 'src/app/models/product';
import { ProductComponent } from '../product/product.component';
import { empty } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListService, ProductService]
})
export class ListComponent implements OnInit {

  listas = [];
  productos = [];

  keyGuardar;
  keyCargar;

  @ViewChild(ProductComponent, null) productosLista;

  constructor(private listService: ListService, private productService: ProductService, private _snachBar: MatSnackBar) { }

  ngOnInit() {
    this.getListByKey("NADIE");
  }

  async getLists(){
    await this.listService.getLists().subscribe(res =>{
      this.listas = res as List[];
      for(let lista of this.listas){
        this.productService.getProductsById(lista._id).subscribe(res =>{
          lista.products = res as Array<String>;
        });
      }
    })
  }

  saveList(form?: NgForm){
    // comprobar si hay listas.
    if(this.listas.length < 1){
      this._snachBar.open('No hay listas para guardar', null, {
        duration: 3000
      })
      return; // Nada que hacer si no hay listas    
    }
    if(form.value.keyGuardar == null || form.value.keyGuardar.length < 0){
      this._snachBar.open('Escribe una clave en "Guardar Listas"', null, {
        duration: 3000
      })
      return;
    }

    // Asignamos key a cada lista.
    for(let lista of this.listas){
        lista.key = this.keyGuardar;
        lista.products = this.productosLista.idProductos;
        lista as List;
        
        this.listService.putList(lista).subscribe(res =>{
          this._snachBar.open('Listas guardadas', null, {duration: 3000});
        });
    }
    this.resetForm(form);
  }

  getListByKey(key: string){
    if(key ===undefined || key ===""){
      this._snachBar.open('Indica una clave para buscar', null, {duration: 3000});
      return;
    }
    
    this.listService.getListByKey(key).subscribe(res =>{
        this.listas = res as List[];
        console.log(res);
        if(Object.keys(res).length ===0){
          this._snachBar.open('No se han encontrado listas ', null, {duration: 3000});
        }
        for(let lista of this.listas){
          this.productService.getProductsById(lista._id).subscribe(res =>{
            var respuesta = res as Product[];
            var idProducts = [] ;
            for(var i = 0; i < respuesta.length; i++){
              idProducts[i] = respuesta[i]._id;
            }
            lista.products = idProducts;
          });
          
        }
    })
  }

  addList(form?: NgForm){
    if(form.value.name.length === 0){
      this._snachBar.open('Para crear una lista debes poner un nombre', null, {duration: 3000});
      return;
    }
    // Existe la lista
    if(form.value._id){
      form.value.products = this.productosLista.idProductos;

      this.listService.putList(form.value).subscribe(res =>{
        this.resetForm(form);
        this.getListByKey(form.value.key);
        this._snachBar.open('Lista actualizada', null, {duration: 3000});
      })
    } else{
      form.value.key = "NADIE";
      this.listService.postList(form.value).subscribe(res =>{
        this.resetForm(form);
        this.getListByKey("NADIE");
        this._snachBar.open('Lista creada', null, {
          duration: 3000
        })
      })
    }
  }

  editList(list: List){
    this.listService.selectedList = list;
  }

  deleteList(lista: List){
    console.log(lista);
    /*
    if( Object.keys(lista.products).length !==0){
      this._snachBar.open('borra antes los productos', null, {
        duration: 3000
      })
      return;
    }*/
    
    if(confirm('¿Borrar?')){
      /*
      var productos = lista.products as Array<string>;
      for(var i = 0; i < lista.products.length; i++){
        this.productService.deleteProduct(productos[i]).subscribe(res =>{
          console.log(res);
          
        });
      }*/
      this.listService.deleteList(lista._id).subscribe(res =>{
        this._snachBar.open('Lista eliminada', null, {
          duration: 3000
        })
        this.getListByKey(lista.key);
      })
    }
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
    this.listService.selectedList = new List();
  }

}
