import { Component, Inject, OnInit, VERSION } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CilindradaI, ClaseVehiculoI, DialogDataEtiquetado, EvaEtiquetado, Informacionvehiculo, MarcaI, TipoCombustibleI, TipoServicioI, TipologiaVehicular } from 'src/app/modelos/login.interface';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';
import { NotificationService } from 'src/app/servicios/notification.service';
import { DialogVisorPdfComponent } from '../dialog-visor-pdf/dialog-visor-pdf.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CIUDADANO, EVA_ETIQUETADO, INFO_VEHICULO, VEHICULO_PESADO_CARGA, VEHICULO_TRANS_PUBL_PASAJER_URBANO } from 'src/app/modelos/ruido.interface';

@Component({
  selector: 'app-infovehiculo',
  templateUrl: './infovehiculo.component.html',
  styleUrls: ['./infovehiculo.component.scss']
})
export class InfovehiculoComponent implements OnInit {

  evaEtiquetado: EvaEtiquetado = EVA_ETIQUETADO;
  form: FormGroup = new FormGroup({});
  submitted = false;

  date: string = 'yyyy/mm/dd';
  mensajeDeError = "";
  name = "Angular " + VERSION.major;
  display: FormControl = new FormControl("", Validators.required);
  file_store !: FileList;
  file_list: Array<string> = [];

  listMarca: MarcaI[] = [];
  selectedMarca: MarcaI = { idmarca: 0, idclasevehiculo: 0, nombre: '' }

  listCilindrada: CilindradaI[] = [];
  selectedCilindrada: CilindradaI = { idcilindrada: 0, idclasevehiculo: 0, nombre: '' }

  listClaVehi: ClaseVehiculoI[] = [];  //  { idclasevehiculo:0, nombre:''};
  selectedClaseVehiculo: ClaseVehiculoI = { idclasevehiculo: 0, nombre: '' };

  listTipologiaVehicular: TipologiaVehicular[] = [];  //  { idclasevehiculo:0, nombre:''};
  selectedTipologiaVehicular: TipologiaVehicular = { idtipologiavehicular: 0, nombre: '' };
  selectedTipologia = '';



  listTipoServicio: TipoServicioI[] = [];  //  { };
  selectedTipoServicio: TipoServicioI = { idtiposerv: 0, nombre: '' };

  listTipoCom: TipoCombustibleI[] = [];  //  { idclasevehiculo:0, nombre:''};
  selectedTipoCombustible: TipoCombustibleI = { idtipocombustib: 0, idclasevehiculo: 0, nombre: '' };

  placa: string = 'AAA000';
  informacionvehiculo: Informacionvehiculo = INFO_VEHICULO;
  vehiculoPesadoCarga: string = VEHICULO_PESADO_CARGA;
  vehiculoTrPubPasaUr: string = VEHICULO_TRANS_PUBL_PASAJER_URBANO

  // aaaaaaaaaaaaaaaaaa 9999999999999999999999999


  constructor(
    private etService: EtiquetadoService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InfovehiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEtiquetado,
  ) {


  }

  ngOnInit(): void {
    
    this.cargaListaTipologiaVehicular();
    this.cargaListaMarcas()
    this.cargaListaCilindrada();
    this.cargaListaTipoCombustible();

    this.recogeDatosModal();
    
    this.cargaDataBaseDatosInfoVehic(this.placa);

    
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


 
  onChangeTipoServicio(selectedTiposervicio: TipoServicioI) {
    
  }

  cargaDataBaseDatosInfoVehic(placa: string) {

    this.etService.listClaseVehiculo().subscribe(x => {
      x;
    
      this.listClaVehi = x;
 
    });

    
    this.etService.listTipoServicio().subscribe(x => {
      x;
 
      this.listTipoServicio = x;
 
    });

    //   this.etService.consultaObjetoPlaca(placa).subscribe(x => {
    //     this.informacionvehiculo = x.informacionvehiculo;
    //   })

    this.listCilindrada = [];
    
    this.etService.listCilindrada(this.selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listCilindrada = x;
    });

  }

  /*
  cargaDatoPlaca() {
    this.etService.placaObserv.subscribe(
      x => {
        this.placa = x;
      }
    )
  }*/

  guardaInfoVehiculo() {



    let titMensaje: string = 'Desea guardar la información ..';
   
    this.informacionvehiculo.placa = this.placa;
    this.informacionvehiculo.claseVehiculo = this.selectedClaseVehiculo.nombre;
    this.informacionvehiculo.tipologiaVehicular = this.selectedTipologiaVehicular.nombre;
    this.informacionvehiculo.tipoServicio = this.selectedTipoServicio.nombre;
    this.informacionvehiculo.tipoCombustible = this.selectedTipoCombustible.nombre;
    this.informacionvehiculo.marca = this.selectedMarca.nombre;
    this.informacionvehiculo.cilindraje = this.selectedCilindrada.nombre;

    this.informacionvehiculo.capacidadPasajeros = this.informacionvehiculo.capacidadPasajeros;
    this.informacionvehiculo.capacidadCarga = this.informacionvehiculo.capacidadCarga;

    this.notificationService.confirmation(titMensaje, () => {


      this.etService.guardaInfoVehiculo(this.informacionvehiculo).subscribe(
        x => {
          x;

          if (localStorage.getItem("username") == CIUDADANO) {
            this.router.navigate(['eva/ciudadano']).then(() => {
              window.location.reload();
            });
          } else {
            
            this.router.navigate(['/etiquetado']).then(() => {
              window.location.reload();
            });
          }
          
        },
        err => {
          this.mensajeDeError = 'ocurrio un error';
     
        }
      )


      this.notificationService.success("confirm oked");
     
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
     
      this.placa = result;
    });
  }


  /*
  onChangeClaseVehiculo(selectedClaseVehiculo: ClaseVehiculoI) {
    // let contClaseVehi = this.indiceVehicForm.get("claseVehiculo") ;
   

   
    this.listTipoCom = [];
    this.etService.listTipoCombustible(selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listTipoCom = x;
    });

    this.listCilindrada = [];
   
    this.etService.listCilindrada(selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listCilindrada = x;
    });

    this.listMarca = [];
   
    this.etService.listMarca(selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listMarca = x;
    });
  }
  */

  onChangeCilindrada(selectedCilindrada: CilindradaI) {

  }

  onChangeMarca(selectedMarca: MarcaI) {

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

  
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  recogeDatosModal() {
    this.informacionvehiculo.vin = this.data.dataVehiculo.vin;
    this.informacionvehiculo.numeroMotor = this.data.dataVehiculo.numeroMotor;
    this.informacionvehiculo.capacidadCarga = this.data.dataVehiculo.capacidadCarga;
    this.informacionvehiculo.capacidadPasajeros = this.data.dataVehiculo.capacidadPasajeros;

    this.informacionvehiculo.fechaImportacion = this.data.dataVehiculo.fechaImportacion;
    this.informacionvehiculo.modelo = this.data.dataVehiculo.modelo;
    this.informacionvehiculo.linea = this.data.dataVehiculo.linea;
    this.selectedMarca.nombre = this.data.dataVehiculo.marca;
    this.selectedClaseVehiculo.nombre = this.data.dataVehiculo.claseVehiculo;
    this.selectedTipologiaVehicular.nombre = this.data.dataVehiculo.tipologiaVehicular;
    this.selectedTipoServicio.nombre = this.data.dataVehiculo.tipoServicio;
    this.placa = this.data.dataVehiculo.placa;
    this.selectedTipoCombustible.nombre = this.data.dataVehiculo.tipoCombustible;
    this.selectedCilindrada.nombre = this.data.dataVehiculo.cilindraje;
    this.informacionvehiculo.ciudadMatricula = this.data.dataVehiculo.ciudadMatricula;
    this.informacionvehiculo.vigenciaRTM = this.data.dataVehiculo.vigenciaRTM;
    this.informacionvehiculo.tecnRedEmision = this.data.dataVehiculo.tecnRedEmision;
    this.informacionvehiculo.estEmisiVehic = this.data.dataVehiculo.estEmisiVehic;
    this.informacionvehiculo.subContEmision = this.data.dataVehiculo.subContEmision;


    
  }

  cargaListaTipoCombustible() {
    this.listTipoCom = [];
    this.etService.listTipoCombustible(-1).subscribe(x => {
      this.listTipoCom = x;
    });
  }

  cargaListaCilindrada() {
    this.listCilindrada = [];
    
    this.etService.listCilindrada(-1).subscribe(x => {
      this.listCilindrada = x;
    });

  }

  cargaListaTipologiaVehicular() {
    this.listTipologiaVehicular = [];
    this.etService.listTipologiaVehicular(-1).subscribe(x => {
      this.listTipologiaVehicular = x;
    });

  }

  cargaListaMarcas() {
    this.listMarca = [];
   
    this.etService.listMarca(-4).subscribe(x => {
      this.listMarca = x;
    });
  }

 
  calculoFactorVehiAmbientalTipoVehicular(event: any) {
    let informVehiFAV: Informacionvehiculo = INFO_VEHICULO;
    informVehiFAV.tipologiaVehicular = this.selectedTipologiaVehicular.nombre;
   

    // informVehiFAV.tipologiaVehicular = this.selectedTipologia;
   

        
    this.etService.actualizarInformaVehiculoBehavior(informVehiFAV);
/*
 */
  }

  calculoFactorVehiAmbTipoVehicularCombustible(event: any) {
    let informVehiFAV: Informacionvehiculo = INFO_VEHICULO;
    informVehiFAV.tipologiaVehicular = this.selectedTipologiaVehicular.nombre;
    informVehiFAV.tipoCombustible = this.selectedTipoCombustible.nombre
   
        
    this.etService.actualizarInformaVehiculoBehavior(informVehiFAV);
/*
 */
  }

  calculoFactorVehiAmbiental(event: any) {
   
    let informVehiFAV: Informacionvehiculo = INFO_VEHICULO;
    informVehiFAV.placa = this.placa;
    informVehiFAV.claseVehiculo = this.selectedClaseVehiculo.nombre;
    informVehiFAV.tipologiaVehicular = this.selectedTipologiaVehicular.nombre;
    informVehiFAV.tipoServicio = this.selectedTipoServicio.nombre;
    informVehiFAV.tipoCombustible = this.selectedTipoCombustible.nombre;
    informVehiFAV.marca = this.selectedMarca.nombre;
    informVehiFAV.cilindraje = this.selectedCilindrada.nombre;

    informVehiFAV.capacidadPasajeros = this.informacionvehiculo.capacidadPasajeros;
    informVehiFAV.capacidadCarga = this.informacionvehiculo.capacidadCarga;
    
   
    this.etService.calculoFactosAmbiVehicular(informVehiFAV).subscribe(x => {
      
      if (x == null) {
        this.evaEtiquetado = EVA_ETIQUETADO;
      } else {
        this.evaEtiquetado = x;
      }
    });


  }
}
