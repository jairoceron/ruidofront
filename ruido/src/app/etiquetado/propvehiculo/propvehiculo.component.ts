import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogDataEtiquetado, Propietariovehiculo } from 'src/app/modelos/login.interface';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';
import { NotificationService } from 'src/app/servicios/notification.service';
import { InfovehiculoComponent } from '../infovehiculo/infovehiculo.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CIUDADANO, PROPIETARIOVEHICULO } from 'src/app/modelos/ruido.interface';

@Component({
  selector: 'app-propvehiculo',
  templateUrl: './propvehiculo.component.html',
  styleUrls: ['./propvehiculo.component.scss']
})
export class PropvehiculoComponent implements OnInit {
  displayMessage: { [key: string]: string } = {};
  form: FormGroup = this.formBuilder.group({
    primerNombre: ['', [Validators.required]],
    segundoNombre: ['', []],
    primerApellido: ['', [Validators.required]],
    segundoApellido: ['', []],
    numeroIdentificacion: ['', [Validators.required]],
    tpIdentificacion: ['', [Validators.required]],
    correoElectronico: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.maxLength(40)]],
  });

  submitted = false;
  mensajeDeError: string = '';
  primerNombre: string = '';
  segundoNombre: string = '';
  primerApellido: string = '';
  segundoApellido: string = '';
  numeroIdentificacion: string = '';
  telefono: string = '';
  correoElectronico: string = '';
  // placa: string = 'AAA001';
  propvehiculo: Propietariovehiculo = {};
  tpIdentificacion: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private etService: EtiquetadoService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<InfovehiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataEtiquetado,
  ) { }

  ngOnInit(): void {
    this.cargadataPlaca();
  }


  cargadataPlaca() {
    // this.etService.placaObserv.subscribe(x => {
    // this.placa = x
    //  })
    PROPIETARIOVEHICULO.placa = this.data.dataVehiculo.placa;
    this.etService.propietarioVehiculoPlaca(PROPIETARIOVEHICULO).subscribe(x => {

     
      if (x == null) {
        // aaaaaaaaaaaaaaaaaaaaaaa
        this.propvehiculo = PROPIETARIOVEHICULO;
        // this.propvehiculo.placa = 
      } else {
        this.propvehiculo = x;
      }

     
    })

    //   fffffffffffffffffffffffff 999999999999999
  }


  guardarPropVehiculo() {


    /*
        this.propvehiculo = {
          idevapropvehi: 1,
          nombre1: this.primerNombre,
          nombre2: this.segundoNombre,
          apellido1: this.primerApellido,
          apellido2: this.segundoApellido,
          placa: this.placa,
          identificacion: this.numeroIdentificacion,
          tipoidentifica: this.tpIdentificacion,
        }
    */




  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }


    
    this.form.get('name of you control')



    
   
    this.propvehiculo.idevapropvehi = this.form.value.idevapropvehi;  
    this.propvehiculo.nombre1 = this.form.value.primerNombre;   
    this.propvehiculo.nombre2 = this.form.value.segundoNombre;   
    this.propvehiculo.apellido1 = this.form.value.primerNombre;  
    this.propvehiculo.apellido2 = this.form.value.segundoApellido;  
    this.form.value.placa = this.data.dataVehiculo.placa;
    this.propvehiculo.placa = this.form.value.placa;        
    this.propvehiculo.identificacion = this.form.value.numeroIdentificacion;  
    this.propvehiculo.tipoidentifica  = this.form.value.tpIdentificacion; 
    this.propvehiculo.email    = this.form.value.correoElectronico;        
    this.propvehiculo.telefono  = this.form.value.telefono;    
    // aaaaaaaaaaaaaaaaaa999999999999999999999999999999


    this.notificationService.confirmation("Desea actualizar los datos del propietario del Vehículo", () => {
      this.notificationService.success("Confirmación Ok");
      this.etService.guardaPropietarioVehiculo(this.propvehiculo).subscribe(x => {
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

      })
    },
      'Está usted seguro?',
      () => {
        this.notificationService.error("Confirmación Cancelada");
      });




  }

  get f(): { [key: string]: AbstractControl } {
    
    return this.form.controls;
  }

}
