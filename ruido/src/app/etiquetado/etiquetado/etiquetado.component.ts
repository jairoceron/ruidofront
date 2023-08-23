import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaI, CilindradaI, ClaseVehiculoI, EstadoEmisionI, LoginI, PesoVehiculoI, TipoCombustibleI } from 'src/app/modelos/login.interface';
import { ApiService } from 'src/app/servicios/api.service';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';
//import { slideInAnimation } from './animations';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { style, animate, animation, animateChild, useAnimation, group, sequence, transition, state, trigger, query as q, stagger } from '@angular/animations';

@Component({
  selector: 'app-etiquetado',
  templateUrl: './etiquetado.component.html',
  styleUrls: ['./etiquetado.component.scss'],
  animations: [
    
    // animation triggers go here
  ]
})
export class EtiquetadoComponent implements OnInit {


  value : string = 'XXX000';
  placa : string = 'XXX000';

  listPesoVehiculo : PesoVehiculoI[] = [];
  selectedPesoVehiculo : PesoVehiculoI = {idpesovehiculo:0, idclasevehiculo:0, nombre:''}

  listCategoria: CategoriaI[] = [];
  selectedCategoria : CategoriaI = {idcategoria:0, idclasevehiculo:0, nombre:''}

  listCilindrada: CilindradaI[] = [];
  selectedCilindrada : CilindradaI = {idcilindrada:0, idclasevehiculo:0, nombre:''}

  listEstandarEmision: EstadoEmisionI[] = [];
  selectedEstandarEmision : EstadoEmisionI = {idestanemision:0, idclasevehiculo:0, nombre:''}
 
  listTipoCom : TipoCombustibleI[] = [];  //  { idclasevehiculo:0, nombre:''};
  selectedTipoCombustible : TipoCombustibleI =   {idtipocombustib:0, idclasevehiculo:0, nombre:''};

  listClaVehi : ClaseVehiculoI[] = [];  //  { idclasevehiculo:0, nombre:''};
  selectedClaseVehiculo :  ClaseVehiculoI = { idclasevehiculo:0, nombre:''};

  indiceVehicForm  : FormGroup = new FormGroup({
    claseVehiculo : new FormControl('',Validators.required),
    tipoCombustible  : new FormControl('',Validators.required),
    estandarEmision  : new FormControl('',Validators.required),
    cilindrada  : new FormControl('',Validators.required),
    categoria  : new FormControl('',Validators.required),
    pesovehiculo  : new FormControl('',Validators.required),
  });
  
  constructor(private etService:EtiquetadoService,
    private router: Router) { }

  ngOnInit(): void {
    this.etService.listClaseVehiculo().subscribe( x => { 
      console.log('clases de vehiculoc ... ' , x);
      this.listClaVehi = x;
    })
  }

  onEtiquetado(form:LoginI) {
  }

  generarPDFetiquetado() {
    this.etService.generarPDFetiquetado(this.placa).subscribe( x => {
       x;
       console.log(x);
      });
  }

  onChangeClaseVehiculo(selectedClaseVehiculo: ClaseVehiculoI ) {
    // let contClaseVehi = this.indiceVehicForm.get("claseVehiculo") ;
    // console.log("valor de clase de vehiculo ::: " , contClaseVehi?.value );
    // console.log("value ... vehiculo ::: " , this.indiceVehicForm.controls['claseVehiculo']);
    
    console.log("value ... sss ::: " , selectedClaseVehiculo);
    this.listTipoCom = [];
    this.etService.listTipoCombustible(selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listTipoCom = x;
    });

    this.listEstandarEmision = [];
    this.etService.listEstadoEmision(selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listEstandarEmision = x;
    });

    this.listCilindrada = [];
    this.etService.listCilindrada(selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listCilindrada = x;
    });

    this.listCategoria = [];
    this.etService.listCategoria(selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listCategoria = x;
    });

    this.listPesoVehiculo = [];
    this.etService.listPesoVehiculo(selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listPesoVehiculo = x;
    });

  }

  onChangeTipoCombustible(selectedTipoCombustible : TipoCombustibleI )  {
   // let contClaseVehi = this.indiceVehicForm.get("claseVehiculo") ;
   // console.log("valor de clase de vehiculo ::: " , contClaseVehi?.value );
   // console.log("value ... vehiculo ::: " , this.indiceVehicForm.controls['claseVehiculo']);
    
    console.log("value ... sss ::: " , selectedTipoCombustible);
    /*
    this.etService.listTipoCombustible(selectedClaseVehiculo.idclasevehiculo).subscribe(x => {
      this.listTipoCom = x;
    });
*/

  }

  onChangeEstandarEmision(selectedEstandarEmision : EstadoEmisionI ) {

  }

  onChangeCilindrada(selectedCilindrada : CilindradaI ) {

  }
  onChangeCategoria(selectedCategoria : CategoriaI ) {

  }

  onChangePesoVehiculo(selectedPesoVehiculo : PesoVehiculoI ) {

  }

  propietarioVehiculo() {    
    this.router.navigate(['/propvehiculo']);    
  }

  datosVehiculo() {
    console.log('El siguiente paso es mas duro que este ..... (1)');
    this.router.navigate(['/infoVehic']);
    console.log('El siguiente paso es mas duro que este ..... (2)');
  }
//*********************************
}
