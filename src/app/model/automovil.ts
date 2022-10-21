export class Automovil {

    id?: number;
    modelo: string;
    marca: string;
    patente: string;
    motor: string;
    color: string;
    cantPuertas: number;
    imagen:string;

    constructor({modelo, marca, patente, motor, color,cantPuertas,imagen}:{marca: string; modelo: string; patente: string; color: string; cantPuertas:number; motor:string;imagen:string }) {        
         this.modelo = modelo;
         this.marca = marca;
         this.patente = patente;
         this.color = color;
         this.cantPuertas = cantPuertas;
         this.imagen = imagen;
         this.motor = motor;
     }
}  