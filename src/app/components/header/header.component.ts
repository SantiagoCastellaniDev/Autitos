import { Component, OnInit } from '@angular/core';
import { Automovil } from 'src/app/model/automovil';
import { AutomovilService } from 'src/app/services/automovil.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  automoviles: Automovil[]=[];
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
  editableAuto: Automovil[]=[];
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
          alert("El auto se guardo correctamente")
        },
        (error)=>{
          alert("Por algún motivo no se esta pudiendo guardar el vehículo")
        },
        ()=>{this.obtenerAutos()})
    } else {
      alert("Para agregar autos necesita una clave secreta")
    }    
  }

  /*--------EDITAR AUTOMOVIL------------------*/

  //Boton abrir modal: Capturar Id y automovil

  editAuto(id:any,automovil: Automovil[]){
    this.editableAuto = automovil;
    this.editId = id;
    console.log(id)    
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
          alert("El auto se guardo correctamente")
        },
        (error) => {
          alert("Algo ha fallado: " + error);
        },
        ()=>{this.obtenerAutos()})
    } else {
      alert("Para editar autos necesita una clave secreta")
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
          alert("El auto se elimino correctamente")
        },
        (error) => {
          alert("Algo ha fallado: " + error);
        },
        ()=>{this.obtenerAutos()})
    } else {
      alert("Para eliminar autos necesita una clave secreta")
    }    
  }


}
