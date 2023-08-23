import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Propietariovehiculo } from 'src/app/modelos/login.interface';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';

@Component({
  selector: 'app-placa',
  templateUrl: './placa.component.html',
  styleUrls: ['./placa.component.scss']
})
export class PlacaComponent implements OnInit {
  displayedColumns: string[] = ['idevapropvehi', 'placa', 'nombre1', 'nombre2', 'apellido1', 'apellido2', 'identificacion', 'tipoidentifica'];
  dataSource = new MatTableDataSource<Propietariovehiculo>();
  constructor(private etService: EtiquetadoService) { }

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;


  // @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatSlideToggle, { static: true }) stoggle!: MatSlideToggle;


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cargarDatasource();
  }
  /*
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  */

  applyFilter(filterValue: Event) {
    let filterX = (filterValue.target as HTMLTextAreaElement).value;
    filterX = filterX.trim(); // Remove whitespace
    filterX = filterX.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterX;
  }

  cargarDatasource() {
    this.etService.listPropietarioVehiculo('AGA258').subscribe(x => {
      x;
      console.log(x);
      this.dataSource = new MatTableDataSource<Propietariovehiculo>(x);
    })
  }



}
