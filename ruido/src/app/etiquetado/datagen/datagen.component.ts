import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Informacionvehiculo } from 'src/app/modelos/login.interface';
import { INFO_VEHICULO, PqrsDTO } from 'src/app/modelos/ruido.interface';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';
import { InfovehiculoComponent } from '../infovehiculo/infovehiculo.component';
import { EstaticComponent } from '../estatic/estatic.component';

@Component({
  selector: 'app-datagen',
  templateUrl: './datagen.component.html',
  styleUrls: ['./datagen.component.scss']
})
export class DatagenComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;


  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatSlideToggle, { static: true })
  stoggle!: MatSlideToggle;

  listInfoVehiculo: Informacionvehiculo[] = [];
  infoVehiculo: Informacionvehiculo = INFO_VEHICULO;

  pipe = new DatePipe('en-US');
  dataSource: MatTableDataSource<Informacionvehiculo> = new MatTableDataSource(this.listInfoVehiculo);
  
  // 'TIPOLOGIAVEHICULAR',
  public displayedColumns: string[] = ['IDEVAINFOVEHIC',
    'IDPRUE_STATIC',
    'PLACA', 
    'TIPOSERVICIO', 'TIPOCOMBUSTIBLE', 'CILINDRAJE',
    'MARCA', 'LINEA', 'MODELO',
    'FECHAIMPORTACION', 'CAPACIDADCARGA',
    'CLASEVEHICULO',
    'NUMEROMOTOR',
    'VIN',
    'CIUDADMATRICULA',
    'VIGENCIARTM',
    'TECNREDEMISION',
    'ESTEMISIVEHIC',
    'SUBCONTEMISION',
    'color_ETIQUETA',
  ];
  /*
  
  	
  */
  constructor(
    private etService: EtiquetadoService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.cargaDataInfoVehic(INFO_VEHICULO);
  }

  cargaDataInfoVehic(infoVehiculo: Informacionvehiculo) {
    console.log('Consulta visita :::');
    // this.consultaService.consultaObserv.subscribe()

    this.etService.consultaDataInfoVehic(infoVehiculo).subscribe(
      x => {
        //    x;
        console.log(x);
        this.dataSource = new MatTableDataSource(x);
        console.log('paso 1 :: listado de visitas');
        this.dataSource.paginator = this.paginator;
      }
    )


  }


  openDialog(infoVehiculo: Informacionvehiculo): void {
    console.log('Informacion del vehículo ... ' + infoVehiculo.placa);
    const dialogRef = this.dialog.open(InfovehiculoComponent, {
      data: { dataVehiculo: infoVehiculo, },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  
  openDiagol_PruebasEstaticas(infoVehiculo: Informacionvehiculo): void {
    console.log('Informacion del vehículo ... ' + infoVehiculo.placa);
    const dialogRef = this.dialog.open(EstaticComponent, {
      data: { dataVehiculo: infoVehiculo, },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
