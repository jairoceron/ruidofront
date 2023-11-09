import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Informacionvehiculo, MetadataArchPDF } from 'src/app/modelos/login.interface';
import { INFO_VEHICULO, PqrsDTO } from 'src/app/modelos/ruido.interface';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';
import { InfovehiculoComponent } from '../infovehiculo/infovehiculo.component';
import { EstaticComponent } from '../estatic/estatic.component';
import { PropvehiculoComponent } from '../propvehiculo/propvehiculo.component';
import { DialogVisorPdfComponent } from '../dialog-visor-pdf/dialog-visor-pdf.component';

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
  
  // 'TIPOLOGIAVEHICULAR', 'MARCA', 'LINEA',
  public displayedColumns: string[] = ['IDEVAINFOVEHIC',
    'IDPRUE_STATIC',
    'propietVehiculo',
    'hologramaPrint',
    'pdfReporte',
    'PLACA', 
    'TIPOSERVICIO', 'TIPOCOMBUSTIBLE', 'CILINDRAJE',
     'MODELO',
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

  openDiagol_propietVehiculo(infoVehiculo: Informacionvehiculo): void {
    console.log('Propietario Informacion del vehículo ... ' + infoVehiculo.placa);
    const dialogRef = this.dialog.open(PropvehiculoComponent, {
      data: { dataVehiculo: infoVehiculo, },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  imprimirEtiqHolograma(infoVehiculo: Informacionvehiculo): void {

    console.log('impresion del holograma : placa inicia la impresion de la etiqueta :::: this.placa >>> ', infoVehiculo.placa);
    this.etService.imprimirEtiqHolograma(infoVehiculo.placa).subscribe(
      x => {
        x;
        console.log('impresion del holograma : placa', infoVehiculo.placa, ' ---- > ', x);

        const dialogRef = this.dialog.open(DialogVisorPdfComponent, {
          width: '500px',
          // 
          // ./assets/pdf/morfologia_muestra-2227501_usuario-2177.pdf
          // ./assets/pdf/etiquetadoAAA000.pdf
          data: { rutaPdfHolograma: x.pathAssets, rutaPdfInfoEtiqueta: x.pathAssets }
        });

     //   dialogRef.afterClosed().subscribe(result => {
     //     console.log('The dialog was closed');
     //     infoVehiculo.placa = result;
     //   });


      }
    )



  }

  imprimirPdfReporte(infoVehiculo: Informacionvehiculo): void {
    this.etService.generarPDFetiquetado(infoVehiculo.placa).subscribe(x => {
      x;
      console.log('GDMPTLB ...... ', x);
      this.pantallaModalViewPdf(x);

    });
  }

  generarPDFetiquetado() {
    

  }

  pantallaModalViewPdf(metadataArchPDF: MetadataArchPDF) {

    const dialogRef = this.dialog.open(DialogVisorPdfComponent, {
      width: '1000px',
      // 
      // ./assets/pdf/morfologia_muestra-2227501_usuario-2177.pdf
      // ./assets/pdf/etiquetadoAAA000.pdf
      data: { rutaPdfHolograma: metadataArchPDF.pathAssets, rutaPdfInfoEtiqueta: metadataArchPDF.pathAssets }
    });

  //  dialogRef.afterClosed().subscribe(result => {
  //    console.log('The dialog was closed');
 //     this.placa = result;
 //   });

    // *******************
  }

}
