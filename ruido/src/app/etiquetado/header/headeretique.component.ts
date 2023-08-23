import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaI, CilindradaI, ClaseVehiculoI, EstadoEmisionI, Informacionvehiculo, MetadataArchPDF, PesoVehiculoI, TipoCombustibleI } from 'src/app/modelos/login.interface';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';
import { DialogVisorPdfComponent } from '../dialog-visor-pdf/dialog-visor-pdf.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-headeretique',
  templateUrl: './headeretique.component.html',
  styleUrls: ['./headeretique.component.scss']
})
export class HeaderetiqueComponent implements OnInit {
  placa: string = 'DDD000';
  informacionvehiculo: Informacionvehiculo = {
    idevapropvehi: 0,
    placa: this.placa,
    tipologiaVehicular: '',
    tipoServicio: '',
    tipoCombustible: '',
    cilindraje: '',
    marca: '',
    linea: '',
    modelo: '',
    fechaImportacion: new Date(),
    capacidadCarga: '',
    claseVehiculo: '',
    numeroMotor: '',
    vin: '',
    ciudadMatricula: '',
    vigenciaRTM: '',
    tecnRedEmision: '',
    estEmisiVehic: '',
    subContEmision: '',
  }


  constructor(
    private etService: EtiquetadoService,
    private router: Router,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.etService.placaObserv.subscribe(x => { this.placa = x; });

  }
  generarPDFetiquetado() {
    this.etService.generarPDFetiquetado(this.placa).subscribe(x => {
      x;
      console.log('GDMPTLB ...... ' , x);
      this.pantallaModalViewPdf(x);
      
    });

  }

  pantallaModalViewPdf(metadataArchPDF : MetadataArchPDF ) {

    const dialogRef = this.dialog.open(DialogVisorPdfComponent, {
      width: '1000px',
      // 
      // ./assets/pdf/morfologia_muestra-2227501_usuario-2177.pdf
      // ./assets/pdf/etiquetadoAAA000.pdf
      data: { rutaPdfHolograma: metadataArchPDF.pathAssets, rutaPdfInfoEtiqueta: metadataArchPDF.pathAssets }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
    
    this.router.navigate(['/infoVehic']);
    
  }

  ayuda() {
    
    this.router.navigate(['/ayuda']);
    
  }
  //*********************************

  imprimirEtiqHolograma() {


    const dialogRef = this.dialog.open(DialogVisorPdfComponent, {
      width: '500px',
      // 
      // ./assets/pdf/morfologia_muestra-2227501_usuario-2177.pdf
      // ./assets/pdf/etiquetadoAAA000.pdf
      data: { rutaPdfHolograma: './assets/pdf/etiquetadoAAA000.pdf', rutaPdfInfoEtiqueta: './assets/pdf/etiquetadoAAA000.pdf' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.placa = result;
    });



    // *******************
  }
  /*
  this.etService.imprimirEtiqHolograma(this.placa).subscribe(x => {
    x;
    console.log(x);
  }); */

}
