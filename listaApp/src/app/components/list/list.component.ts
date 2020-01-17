import { Component, OnInit, ViewChild } from '@angular/core';
import { ListService } from '../../services/list.service';
import { ProductService } from '../../services/product.service';

import { List } from 'src/app/models/list';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar'; 
import { Product } from 'src/app/models/product';
import { ProductComponent } from '../product/product.component';

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
    // Borrar
  }

  getLists(){
    this.listService.getLists().subscribe(res =>{
      this.listas = res as List[];
      for(let lista of this.listas){
        lista.products = this.productService.getProductsById(lista._id);
      }
      console.log(this.listas);
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
    // Asignamos key a cada lista.
    for(let lista of this.listas){
        lista.key = this.keyGuardar;
        lista as List;
        console.log(lista);
        
        this.listService.putList(lista).subscribe(res =>{
          this._snachBar.open('Listas guardadas', null, {
            duration: 3000
          })
        });
        
    }
    //console.log("Guardando listas: "+this.listas );
    
    this.resetForm(form);
  }

  getListByKey(key: string){
    this.listService.getListByKey(key).subscribe(res =>{
        this.listas = res as List[];
        console.log(res);
        
        for(let lista of this.listas){
          lista.products = this.productService.getProductsById(lista._id);
        }
    })
  }

  addList(form?: NgForm){
    
    // Existe la lista
    if(form.value._id){
      form.value.products = this.productosLista.idProductos;
      //form.value.key = "";
      console.log(form.value.products);
      
            
      this.listService.putList(form.value).subscribe(res =>{
        this.resetForm(form);
        this.getLists();
        this._snachBar.open('Lista actualizada', null, {
          duration: 3000
        })
      })
    } else{
      this.listService.postList(form.value).subscribe(res =>{
        this.resetForm(form);
        this.getLists();
        this._snachBar.open('Lista creada', null, {
          duration: 3000
        })
      })
    }
  }

  editList(list: List){
    console.log(list);
    
    this.listService.selectedList = list;
  }

  // 
  updateList(list: List, newProducs: Product[]){
    
  }

  deleteList(_id: string){
    if(confirm('¿Borrar?')){
      this.listService.deleteList(_id).subscribe(res =>{
        this.getLists();
        this._snachBar.open('Lista eliminada', null, {
          duration: 3000
        })
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
