import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaI, CilindradaI, ClaseVehiculoI, EstadoEmisionI, Informacionvehiculo, MetadataArchPDF, PesoVehiculoI, Propietariovehiculo, TipoCombustibleI } from 'src/app/modelos/login.interface';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';
import { DialogVisorPdfComponent } from '../dialog-visor-pdf/dialog-visor-pdf.component';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/servicios/database.service';
import { FormGroup } from '@angular/forms';
import { InfovehiculoComponent } from '../infovehiculo/infovehiculo.component';
import { INFO_VEHICULO } from 'src/app/modelos/ruido.interface';
import { ExcelService } from 'src/app/servicios/excel.service';

@Component({
  selector: 'app-headeretique',
  templateUrl: './headeretique.component.html',
  styleUrls: ['./headeretique.component.scss']
})
export class HeaderetiqueComponent implements OnInit {
  placa: string = 'DDD000';
  informacionvehiculo: Informacionvehiculo = INFO_VEHICULO;
  dataInformacionVehiculo : Informacionvehiculo[] = [];
  dataPropietariovehiculo : Propietariovehiculo[] = [];


  constructor(
    private etService: EtiquetadoService,
    private router: Router,
    public dialog: MatDialog,
    private databaseService: DatabaseService,
    private excelService: ExcelService,
  
  ) { }

  username: string = '';

  checkOutForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.username = localStorage.getItem("username") || this.username;
    this.etService.placaObserv.subscribe(x => { this.placa = x; });

  }
  generarPDFetiquetado() {
    this.etService.generarPDFetiquetado(this.placa).subscribe(x => {
      x;
     
      this.pantallaModalViewPdf(x);

    });

  }

  pantallaModalViewPdf(metadataArchPDF: MetadataArchPDF) {

    const dialogRef = this.dialog.open(DialogVisorPdfComponent, {
      width: '1000px',
      // 
      // ./assets/pdf/morfologia_muestra-2227501_usuario-2177.pdf
      // ./assets/pdf/etiquetadoAAA000.pdf
      data: { rutaPdfHolograma: metadataArchPDF.pathAssets, rutaPdfInfoEtiqueta: metadataArchPDF.pathAssets }
    });

    dialogRef.afterClosed().subscribe(result => {
     
      this.placa = result;
    });

    // *******************
  }

  actualizaObservador(filterValue: Event) {

    let filterX = (filterValue.target as HTMLTextAreaElement).value;
    filterX = filterX.trim(); // Remove whitespace
    filterX = filterX.toUpperCase(); // Datasource defaults to lowercase matches
    this.etService.actualizarPlacaBehavior(filterX); // actualiza el observable 

  }

  propietarioVehiculo() {
    this.router.navigate(['/propvehiculo']);
  }

  datosVehiculo() {
    let infoVehiculo: Informacionvehiculo = INFO_VEHICULO;
    infoVehiculo.placa = this.placa;
    this.openDialog(infoVehiculo);
    // ki kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    // this.router.navigate(['/infoVehic']);

  }

  openDialog(infoVehiculo: Informacionvehiculo): void {
    
    const dialogRef = this.dialog.open(InfovehiculoComponent, {
      data: { dataVehiculo: infoVehiculo, },
    });

    dialogRef.afterClosed().subscribe(result => {
     
      this.router.navigate(['/etiquetado']);

    });
  }

  ayuda() {

    this.router.navigate(['/ayuda']);

  }
  //*********************************

  imprimirEtiqHolograma() {

   
    this.etService.imprimirEtiqHolograma(this.placa).subscribe(
      x => {
        x;
       

        const dialogRef = this.dialog.open(DialogVisorPdfComponent, {
          width: '500px',
          // 
          // ./assets/pdf/morfologia_muestra-2227501_usuario-2177.pdf
          // ./assets/pdf/etiquetadoAAA000.pdf
          data: { rutaPdfHolograma: x.pathAssets, rutaPdfInfoEtiqueta: x.pathAssets }
        });

        dialogRef.afterClosed().subscribe(result => {
       
          this.placa = result;
        });


      }
    )




    // *******************
  }
  /*
  this.etService.imprimirEtiqHolograma(this.placa).subscribe(x => {
    x;
   
  }); */

  entityPersistenciaVnk() {
    // 6666666666666666666666666666666666
    let tableName = 'pqrs';
  
    this.databaseService.generarEntityTableName(tableName).subscribe(
      x => {
        x;
       
      }
    )
  }

  checOutFun(checkOutForm: FormGroup) {
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }

  descargaExcel() {
    // descarga -- Propietarios de vehículo
    //          -- Información del vehículo
   
    this.etService.consultaDataInfoVehic(INFO_VEHICULO).subscribe(
      x => {
        this.dataInformacionVehiculo = x;
        this.excelService.exportAsExcelFile(this.dataInformacionVehiculo, 'etiquetado.xls')
     

      }
    );

   
    this.etService.listPropietarioVehiculo('GDMPTLB').subscribe(
      x => {
     
        this.dataPropietariovehiculo = x;
        this.excelService.exportAsExcelFile(this.dataPropietariovehiculo, 'propietario.xls')
     

      }
    );

  }

}
