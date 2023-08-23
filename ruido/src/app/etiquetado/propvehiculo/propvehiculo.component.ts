import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Propietariovehiculo } from 'src/app/modelos/login.interface';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';
import { NotificationService } from 'src/app/servicios/notification.service';

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
  ;
  submitted = false;

  primerNombre: string = '';
  segundoNombre: string = '';
  primerApellido: string = '';
  segundoApellido: string = '';
  numeroIdentificacion: string = '';
  telefono: string = '';
  correoElectronico: string = '';
  placa: string = 'AAA001';
  propvehiculo: Propietariovehiculo = {};
  tpIdentificacion: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private etService: EtiquetadoService,
    public notificationService: NotificationService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargadataPlaca();
  }

  cargadataPlaca() {
    this.etService.placaObserv.subscribe(x => {
      this.placa = x
    })
    // 999999999999999
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


    console.log('Mateo 21');
    console.log(JSON.stringify(this.form.value, null, 2));

    console.log(this.form.value.primerNombre);
    this.form.get('name of you control')

    this.propvehiculo = {
      idevapropvehi: 1,
      nombre1: this.form.value.primerNombre,
      nombre2: this.form.value.segundoNombre,
      apellido1: this.form.value.primerApellido,
      apellido2: this.form.value.segundoApellido,
      placa: this.placa,      
      identificacion: this.form.value.numeroIdentificacion,
      tipoidentifica: this.form.value.tpIdentificacion,
    }

    console.log('esta muy interesante GDMPTLB :: ', this.form.controls)
    this.notificationService.confirmation("Desea actualizar los datos del propietario del Vehículo", () => {
      this.notificationService.success("Confirmación Ok");
      this.etService.guardaPropietarioVehiculo(this.propvehiculo).subscribe(x => {
        x;
        console.log(x);
        this.router.navigate(['/listPlaca']);
      })
    },
      'Está usted seguro?',
      () => {
        this.notificationService.error("Confirmación Cancelada");
      });




  }

  get f(): { [key: string]: AbstractControl } {
    // console.log('esta muy interesante GDMPTLB :: ', this.form.controls)
    return this.form.controls;
  }

}
