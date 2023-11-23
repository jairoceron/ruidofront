import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RdoVisita, Visitas } from 'src/app/modelos/ruido.interface';
import { VisitaruidoService } from 'src/app/servicios/visitaruido.service';

@Component({
  selector: 'app-visitaprofesional',
  templateUrl: './visitaprofesional.component.html',
  styleUrls: ['./visitaprofesional.component.scss']
})
export class VisitaprofesionalComponent implements OnInit {


  displayedColumns = ['id', 'profesional_encargado', 'radicado', 'fechavisita','estado_de_la_visita',
  'numero_de_expediente','horario_de_la_visita','direccion','latitud','longitud',
'accion'];
  dataSource: MatTableDataSource<Visitas>;

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;


  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  
  @ViewChild(MatSlideToggle, { static: true })
  stoggle!: MatSlideToggle;


  constructor(private visitaruidoService : VisitaruidoService) {
    
    const users: Visitas[] = [];
    this.dataSource = new MatTableDataSource(users);
    this.cargaTableRdoVisita();

    // Assign the data to the data source for the table to render
    // 

  }

  cargaTableRdoVisita() : void {
   
    this.visitaruidoService.consultaVisitasProfesionalXX().subscribe(x => {
      x;
     
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnInit(): void {
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  actualizaVisita(visitas:Visitas) {
    
  }

}
