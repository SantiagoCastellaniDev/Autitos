import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, /*HttpHeaders*/ } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Automovil } from '../model/automovil';

@Injectable({
  providedIn: 'root'
})
export class AutomovilService {

  /*autoURL = "http://localhost:8080/autos/";*/

  autoURL = "https://auticos-backend-production.up.railway.app/"

  constructor(private http:HttpClient) {}

  //OBTENER DATOS
  public obtenerAutos():Observable<Automovil[]>{
    return this.http.get<Automovil[]>(this.autoURL + "ver")    
  }

  //BUSCAR POR ID
  /*
  public buscarAutomovil(id:number):Observable<Automovil>{
    return this.http.get<Automovil>(this.autoURL + `buscar/${id}`)
  }
*/
  
//GUARDAR  
  public guardarAutomovil(automovil:Automovil):Observable<any>{
    return this.http.post<any>(this.autoURL + "guardar",automovil)
  }

  //ACTUALIZAR  
  public actualizarAutomovil(id:number,automovil:Automovil,httpHeaders:HttpHeaders):Observable<any>{    
  return this.http.put<any>(this.autoURL + `editar/${id}`,automovil,{})
  }

  //BORRAR
  public borrarAutomovil(id:number):Observable<any>{
    return this.http.delete<any>(this.autoURL + `borrar/${id}`)
  }

}

