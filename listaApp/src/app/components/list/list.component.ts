import { Component, OnInit, ViewChild } from '@angular/core';
import { ListService } from '../../services/list.service';
import { List } from 'src/app/models/list';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar'; 
import { Product } from 'src/app/models/product';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListService]
})
export class ListComponent implements OnInit {

  listas = [];
  productos = [];

  @ViewChild(ProductComponent, null) productosLista;

  constructor(private listService: ListService, private _snachBar: MatSnackBar) { }

  ngOnInit() {
    this.getLists();
  }

  getLists(){
    this.listService.getLists().subscribe(res =>{
      //console.log(res);
      
      this.listas = res as List[];
      //this.productosLista.productos
      //this.productos = this.listas.products as Product[];
    })
  }

  addList(form?: NgForm){
    console.log(form.value);
    
    if(form.value._id){
      form.value.products = this.productosLista.productos;
      this.listService.putList(form.value).subscribe(res =>{
        console.log(form.value);
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
