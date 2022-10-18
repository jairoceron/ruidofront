import { Component, OnInit } from '@angular/core';
import { RdoProfesional } from 'src/app/modelos/ruido.interface';
import { ProfesionalService } from 'src/app/servicios/profesional.service';

@Component({
  selector: 'app-nuevisita',
  templateUrl: './nuevisita.component.html',
  styleUrls: ['./nuevisita.component.scss']
})
export class NuevisitaComponent implements OnInit {
  dummyComponent : any;
  profesional: number = 1;
  listProfesional: RdoProfesional[] = [ ];
  fechaInicial: Date= new Date();


  constructor(private profesionalService : ProfesionalService) { }

  ngOnInit(): void {
    this.consultaListaProfesionales() ;
  }

  consultaListaProfesionales() {
    let profesional : RdoProfesional ={ idProfesional:1, nombre:'xxx'};
    this.profesionalService.consultaProfesionales(profesional).subscribe( x => { 
   
     x;
     console.log(x);
     this.listProfesional = x;
   })
  }

}
