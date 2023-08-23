import { Component, OnInit, VERSION } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CilindradaI, ClaseVehiculoI, Informacionvehiculo, MarcaI, TipoCombustibleI, TipoServicioI } from 'src/app/modelos/login.interface';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';
import { NotificationService } from 'src/app/servicios/notification.service';
import { DialogVisorPdfComponent } from '../dialog-visor-pdf/dialog-visor-pdf.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-infovehiculo',
  templateUrl: './infovehiculo.component.html',
  styleUrls: ['./infovehiculo.component.scss']
})
export class InfovehiculoComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  submitted = false;

  date: string = 'yyyy/mm/dd'; 
  mensajeDeError = "";
  name = "Angular " + VERSION.major;
  display: FormControl = new FormControl("", Validators.required);
  file_store !: FileList ;
  file_list: Array<string> = [];

  listMarca: MarcaI[] = [];
  selectedMarca : MarcaI = {idmarca:0, idclasevehiculo:0, nombre:''}
  
  listCilindrada: CilindradaI[] = [];
  selectedCilindrada : CilindradaI = {idcilindrada:0, idclasevehiculo:0, nombre:''}

  listClaVehi: ClaseVehiculoI[] = [];  //  { idclasevehiculo:0, nombre:''};
  selectedClaseVehiculo: ClaseVehiculoI = { idclasevehiculo: 0, nombre: '' };

  listTipoServicio: TipoServicioI[] = [];  //  { };
  selectedTipoServicio: TipoServicioI = { idtiposerv: 0, nombre: '' };

  listTipoCom: TipoCombustibleI[] = [];  //  { idclasevehiculo:0, nombre:''};
  selectedTipoCombustible: TipoCombustibleI = { idtipocombustib: 0, idclasevehiculo: 0, nombre: '' };

  placa: string = 'AAA000';
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

  /*
  
*/

  constructor(
    private etService: EtiquetadoService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {

    
   }

  ngOnInit(): void {
    this.cargaDatoPlaca();
    this.cargaDataBaseDatosInfoVehic(this.placa);

    console.log('asalto de la duda ::: ', this.informacionvehiculo);
  }

  cargaValuesForm() {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: []
      }
    );
  }
  

  /*
  onChangeClaseVehiculo(selectedClaseVehiculo: ClaseVehiculoI ) {
    console.log(".............. onchangeClaseVehiculo");
  }*/

  onChangeTipoServicio(selectedTiposervicio: TipoServicioI) {
    console.log(".............. onchangeClaseVehiculo");
  }

  cargaDataBaseDatosInfoVehic(placa: string) {

    this.etService.listClaseVehiculo().subscribe(x => {
      x;
      console.log('Tipología Vehicular ', x);
      this.listClaVehi = x;
      // **************************************************
    });

    console.log('Pasa a tipo de servicio ::: ');
    this.etService.listTipoServicio().subscribe(x => {
      x;
      console.log('xxxx ::: Tipo Servicio ', x);
      this.listTipoServicio = x;
      // **************************************************
    });

    this.etService.consultaObjetoPlaca(placa).subscribe(x => {
      this.informacionvehiculo = x.informacionvehiculo;
    })

    this.listCilindrada = [];
    console.log("este es el cilindraje ::: " , this.selectedClaseVehiculo.idclasevehiculo );
    this.etService.listCilindrada(this.selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listCilindrada = x;
    });

  }

  cargaDatoPlaca() {
    this.etService.placaObserv.subscribe(
      x => {
        this.placa = x;
      }
    )
  }

  guardaInfoVehiculo() {
    /*
    this.informacionvehiculo = {
      tipologiaVehicular: this.tipologiaVehicular,
      tipoServicio: this.tipoServicio,
      tipoCombustible: this.tipoCombustible,
      cilindraje: this.cilindraje,
      marca: this.marca,
      linea: this.linea,
      modelo: this.modelo,
      fechaImportacion: this.fechaImportacion,
      capacidadCarga: this.capacidadCarga,
      claseVehiculo: this.claseVehiculo,
      numeroMotor: this.numeroMotor,
      vin: this.vin,
      ciudadMatricula: this.ciudadMatricula,
      vigenciaRTM: this.vigenciaRTM,
      tecnRedEmision: this.tecnRedEmision,
      estEmisiVehic: this.estEmisiVehic,
      subContEmision: this.subContEmision,
      placa: this.placa,
    }
*/


    let titMensaje: string = 'Desea guardar la información ..';
    console.log('inform del vehi .. ' , this.informacionvehiculo );
    this.cargaDatoPlaca();
    this.informacionvehiculo.placa = this.placa;
    this.informacionvehiculo.claseVehiculo = this.selectedClaseVehiculo.nombre;
    this.informacionvehiculo.tipologiaVehicular = this.selectedTipoServicio.nombre;
    this.informacionvehiculo.tipoCombustible = this.selectedTipoCombustible.nombre;
    this.informacionvehiculo.marca =  this.selectedMarca.nombre;
    this.informacionvehiculo.cilindraje = this.selectedCilindrada.nombre;
    

    this.notificationService.confirmation(titMensaje, () => {

      
      this.etService.guardaInfoVehiculo(this.informacionvehiculo).subscribe(
        x => {
          x;
          console.log('Informacion del Vehiculo.. ' , x);
          console.log('xxxxx ');
          this.router.navigate(['/objetoPlaca']);  // esto va después de que guarda
        } ,
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

  generarEtiquetaEVA(): void {


    const dialogRef = this.dialog.open(DialogVisorPdfComponent, {
      width: '500px',
      // data: { placa: this.placa, informacionvehiculo: this.informacionvehiculo }
      // ./assets/pdf/morfologia_muestra-2227501_usuario-2177.pdf
      // ./assets/pdf/etiquetadoAAA000.pdf
      data: { rutaPdfHolograma: './assets/pdf/morfologia_muestra-2227501_usuario-2177.pdf', rutaPdfInfoEtiqueta: './assets/pdf/morfologia_muestra-2227501_usuario-2177.pdf' }


    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.placa = result;
    });
  }


  onChangeClaseVehiculo(selectedClaseVehiculo: ClaseVehiculoI) {
    // let contClaseVehi = this.indiceVehicForm.get("claseVehiculo") ;
    // console.log("valor de clase de vehiculo ::: " , contClaseVehi?.value );
    // console.log("value ... vehiculo ::: " , this.indiceVehicForm.controls['claseVehiculo']);

     console.log("value ... sss ::: fffffffffffffffffffffff ");
     console.log(selectedClaseVehiculo);
    this.listTipoCom = [];
    this.etService.listTipoCombustible(selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listTipoCom = x;
    });

    this.listCilindrada = [];
    console.log("este es el cilindraje ::: " , selectedClaseVehiculo.idclasevehiculo );
    this.etService.listCilindrada(selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listCilindrada = x;
    });

    this.listMarca = [];
    console.log("este es el cilindraje ::: " , selectedClaseVehiculo.idclasevehiculo );
    this.etService.listMarca(selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listMarca = x;
    });



  }

  onChangeCilindrada(selectedCilindrada : CilindradaI ) {

  }

  onChangeMarca(selectedMarca : MarcaI ) {

  }

  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }
  }

  handleSubmit(): void {
    var fd = new FormData();
    this.file_list = [];
    for (let i = 0; i < this.file_store.length; i++) {
      fd.append("files", this.file_store[i], this.file_store[i].name);
      this.file_list.push(this.file_store[i].name);
    }

    // do submit ajax
  }
  

  setDate(date: string) {
    this.date = date ? date : '';
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}


