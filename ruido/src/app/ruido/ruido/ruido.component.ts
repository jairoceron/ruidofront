import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruido',
  templateUrl: './ruido.component.html',
  styleUrls: ['./ruido.component.scss']
})
export class RuidoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'ruido';
  fechaInicial: Date= new Date();
  fechaFinal: Date= new Date();

  consultaVariables() {

    let username : string = localStorage.getItem("username") || '';

    
  }

}
