import { Component, OnInit } from '@angular/core';
import { Automovil } from 'src/app/model/automovil';
import { AutomovilService } from 'src/app/services/automovil.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor() { }

  ngOnInit(): void {    
  }  

}
