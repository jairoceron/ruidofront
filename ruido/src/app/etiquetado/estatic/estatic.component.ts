
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDataEtiquetado, FavEtiquetaColor, Informacionvehiculo } from 'src/app/modelos/login.interface';
import { Component, Inject, OnInit, VERSION } from '@angular/core';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';
import { NotificationService } from 'src/app/servicios/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FAV_ETIQUETA_COL, FAV_ETIQUETA_COLOR } from 'src/app/modelos/ruido.interface';

@Component({
  selector: 'app-estatic',
  templateUrl: './estatic.component.html',
  styleUrls: ['./estatic.component.scss']
})
export class EstaticComponent implements OnInit {

  determinarFavSeleccionado: string = 'SI';
  asoc_FAV_colorSeleccionado: string = 'SI';
  limiteDensidadSeleccionado: string = 'SI';
  densidadHumo: number = 0.0;
  materialParticulado: number = 0.0;
  numeroParticulas: number = 0.0;
  mensajeDeError: string = '';
  // naranja, amarillo o verde
  // 99999999999999999999999999999999999999999999999999OOOOOOOOOOOOOOOOOOO
  listColorEtiqueta : FavEtiquetaColor[] = FAV_ETIQUETA_COLOR;
  selectedColorEtiqueta : FavEtiquetaColor = FAV_ETIQUETA_COL; 


  constructor(
    private etService: EtiquetadoService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EstaticComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEtiquetado,
  ) { }

  ngOnInit(): void {
    this.cargaData();
  }

  addYears(date : Date, years:number) {
    date.setFullYear(date.getFullYear() + years);
  
    return date;
  }

  cargaData() {

     this.determinarFavSeleccionado = this.data.dataVehiculo.determin_FAV;
     this.asoc_FAV_colorSeleccionado= this.data.dataVehiculo.asoc_FAV_COLOR;
     this.densidadHumo = this.data.dataVehiculo.densidad_HUMO;
     this.limiteDensidadSeleccionado = this.data.dataVehiculo.cum_LIM_D_HUMO;
     this.materialParticulado = this.data.dataVehiculo.con_MAT_PARTIC;
     this.numeroParticulas =  this.data.dataVehiculo.con_NUM_PARTIC;
     this.selectedColorEtiqueta.nombre = this.data.dataVehiculo.color_ETIQUETA;
   

  }

  guardarComplemento() {
    // 999lllllllllllllllllllllllllllllllllllllll


    let infoVehiculo: Informacionvehiculo = this.data.dataVehiculo;
    infoVehiculo.determin_FAV = this.determinarFavSeleccionado;
    infoVehiculo.asoc_FAV_COLOR = this.asoc_FAV_colorSeleccionado;
    infoVehiculo.densidad_HUMO = this.densidadHumo;
    infoVehiculo.cum_LIM_D_HUMO = this.limiteDensidadSeleccionado;
    infoVehiculo.con_MAT_PARTIC = this.materialParticulado;
    infoVehiculo.con_NUM_PARTIC = this.numeroParticulas;
    infoVehiculo.color_ETIQUETA = this.selectedColorEtiqueta.nombre;
    infoVehiculo.fecha_ETIQUETA = new Date;
    infoVehiculo.fecha_VIG_FIN_ETIQUETA = this.addYears(new Date(), 2);


    console.log(' consciencia ::::.  ', infoVehiculo);

    let titMensaje: string = 'Desea guardar la información ..';



    this.notificationService.confirmation(titMensaje, () => {


      this.etService.guardaInfoVehiculo(infoVehiculo).subscribe(
        x => {
          x;
          console.log('Informacion del Vehiculo.. ', x);
          console.log('xxxxx ');
          this.router.navigate(['/etiquetado']).then(() => {
             window.location.reload();
          });
          // this.router.navigate(['/objetoPlaca']);  // esto va después de que guarda
          // 999999999lllllllllllllllllllllllllllll
        },
        err => {
          this.mensajeDeError = 'ocurrio un error';
          console.log("Error caught at Subscriber " + err);
        }
      )


      this.notificationService.success("confirm oked");
      console.log('Confirmado ........ ');
    },
      'Está seguro de la operación?',
      () => {
        this.notificationService.error("confirm canceled");
      });

    //this.router.navigate(['/listPlaca']);
    //************




  }

}
