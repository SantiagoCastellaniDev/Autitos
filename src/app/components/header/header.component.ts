import { Component, OnInit } from '@angular/core';
import { Automovil } from 'src/app/model/automovil';
import { AutomovilService } from 'src/app/services/automovil.service';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  active: boolean = false;
  automoviles:Automovil[]=[];
  auto:any;
  idAuto?:any;
  marca:string="";
  modelo:string="";
  motor:string="";
  patente:string="";
  color:string="";
  cantPuertas:number=0;
  imagen:string="";
  addForm: any;
  editableAuto:any;
  editId: any;
  borrarId:any;
  password:string="";

  constructor(public automovilService:AutomovilService) { }

  // Inicialización y carga de todos los autos
  ngOnInit(): void {
    this.obtenerAutos();
  }

  obtenerAutos(){
    this.automovilService.obtenerAutos().subscribe(data=>{
      this.automoviles = data;
    })    
  }

  /* GUARDAR AUTO */
  guardarAuto(){
    const nuevoAuto = new Automovil({
      marca:this.marca,
      modelo:this.modelo,
      motor:this.motor,
      patente:this.patente,
      color:this.color,
      cantPuertas:this.cantPuertas,
      imagen:this.imagen
    });
    if (this.password=="verdeverde"){
      this.automovilService.guardarAutomovil(nuevoAuto).subscribe(
        data=>{
          Swal.fire(
            'OK',
            'El auto se guardó correctamente',
            'success'
          )
        },
        (error)=>{
          Swal.fire(
            '¿Error?',
            'Por algún motivo no se puedo almacenar la información',
            'question'
          )
        },
        ()=>{this.obtenerAutos()})
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Password',
        text: 'Se necesita una clave super secreta para crear un automovil'
      })
    }    
  }

  /*--------EDITAR AUTOMOVIL------------------*/

  //Boton abrir modal: Capturar Id y automovil

  editAuto(id:any,automovil: Automovil[]){
    var auto = this.editableAuto;
    this.editId = id;   
    auto = this.automoviles.filter((auto)=>auto.id==id);
     /* Cargar el modal con los datos */
    this.marca=auto[0].marca;
    this.modelo=auto[0].modelo;
    this.color=auto[0].color;
    this.cantPuertas=auto[0].cantPuertas;
    this.patente=auto[0].patente;
    this.motor=auto[0].motor;
    this.imagen=auto[0].imagen;
  }

  //BOTON ACTUALIZAR AUTOMOVIL

  editarAuto(): void{
    const nuevoAuto = new Automovil({
      marca:this.marca,
      modelo:this.modelo,
      motor:this.motor,
      patente:this.patente,
      color:this.color,
      cantPuertas:this.cantPuertas,
      imagen:this.imagen
    });

    const editId = this.editId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.password=="verdeverde") {
      this.automovilService.actualizarAutomovil(editId,nuevoAuto,headers).subscribe(
        data=>{
          Swal.fire(
            'OK',
            'El auto se guardó correctamente',
            'success'
          )
        },
        (error) => {
          Swal.fire(
            '¿Error?',
            'Por algún motivo no se puedo almacenar la información',
            'question'
          )
        },
        ()=>{this.obtenerAutos()})
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Password',
        text: 'Se necesita una clave super secreta para editar un automovil'
      })
    }   
  }

  /*------BORRAR AUTOMOVIL----------------*/

  //BOTON abrir modal: Capturar Id y automovil
  trashAuto(id:any,automovil: Automovil[]): void{
    this.borrarId = id;   
    console.log(this.borrarId);  
  }
  
  //BOTON ELIMINAR AUTOMOVIL
  eliminarAutomovil(): void{
    if (this.password=="verdeverde"){
      this.automovilService.borrarAutomovil(this.borrarId).subscribe(
        data=>{
          Swal.fire(
            'Eliminado',
            'El auto se eliminó correctamente',
            'success'
          )
        },
        (error) => {
          Swal.fire(
            '¿Error?',
            'Por algún motivo no se puedo eliminar la información',
            'question'
          )
        },
        ()=>{this.obtenerAutos()})
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Password',
        text: 'Se necesita una clave super secreta para eliminar un automovil'
      })
    }    
  }


}
