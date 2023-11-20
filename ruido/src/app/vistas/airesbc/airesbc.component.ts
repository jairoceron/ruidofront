import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Sbccalidad } from 'src/app/modelos/ruido.interface';
import { SbccalidadService } from 'src/app/servicios/sbccalidad.service';

@Component({
  selector: 'app-airesbc',
  templateUrl: './airesbc.component.html',
  styleUrls: ['./airesbc.component.scss']
})
export class AiresbcComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) 
  paginator!: MatPaginator;


  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatSlideToggle, { static: true })
  stoggle!: MatSlideToggle;
  myFormDetail: FormGroup = this.fb.group({ 
    email: ['', [Validators.required, Validators.email]],
    name:  ['', [Validators.required, Validators.maxLength(40)]],
  });
  sbccalidad: Sbccalidad[] = [];

  detailDS: MatTableDataSource<Sbccalidad> = new MatTableDataSource(this.sbccalidad);
  displayedColumns = ['variable','valormaximo','valorminimo','ejecutarProceso' ];
  variable : string = '';
  title = 'ruido';
  fechaInicial: Date = new Date();
  fechaFinal: Date = new Date();
  formBuilder: any;
  
  constructor(
    private sbccalidadService : SbccalidadService ,
    private fb: FormBuilder,
    private router: Router,) {

   }

  ngOnInit(): void {
    this.consultaData();
  }

  public consultaData() {
    let sbccalidad: Sbccalidad = new Sbccalidad();
     this.sbccalidadService.consultaLocalidad(sbccalidad).subscribe( 
      x  => {
        this.sbccalidad = x;
        this.detailDS = new MatTableDataSource(this.sbccalidad);
        this.detailDS.paginator = this.paginator;
        console.log('Consulta de data ..... ', x);
        console.log(x);
      });
  }

  public correrProceso(variable:string) {
    console.log("variable ::  ", variable);
    
  }

  calidadDeDatos() {
    console.log('Proceso de calidad de datos')
    this.router.navigate(['microsensor/dataQuality']);
  }

}
