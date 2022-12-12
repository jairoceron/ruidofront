import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pqrs, RdoAsunto, RdoEstado, RdoProfesional, RuiLocalidad, RuiSector } from 'src/app/modelos/ruido.interface';
import { AsuntoService } from 'src/app/servicios/asunto.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { LocalidadService } from 'src/app/servicios/localidad.service';
import { ProfesionalService } from 'src/app/servicios/profesional.service';
import { RadicadoService } from 'src/app/servicios/radicado.service';
import { SectorService } from 'src/app/servicios/sector.service';

@Component({
  selector: 'app-radicado',
  templateUrl: './radicado.component.html',
  styleUrls: ['./radicado.component.scss']
})
export class RadicadoComponent implements OnInit {

  public radicado : string = '';
  public asunto : string = '';
  public direccion : string = '';
  public razonSocial : string = '';
  public x : string = '';
  public y : string = '';
  public sector : string = '';
  public localidad : string = '';
  public cuadrante : string = '';
  public estado : string = '';
  public observacion : string = '';
  public causante : string = '';
  public complemento : string = '';
  public profesional : string = '';
  public fechaPrimeraAsignacion : Date = new Date();
  public fechaRadicado : Date = new Date(); 

  listRuiSector: RuiSector[] = [ ];
  listRuiLocalidad: RuiLocalidad[] = [ ];
  listRdoAsunto: RdoAsunto[] = [ ];
  listRdoEstado: RdoEstado[] = [ ];
  listProfesional: RdoProfesional[] = [ ];


  constructor(private radicadoService:RadicadoService,
    private toastr: ToastrService, 
    private route : Router,
    private sectorService : SectorService,
    private localidadService : LocalidadService,
    private asuntoService : AsuntoService,
    private estadoService : EstadoService,
    private profesionalService : ProfesionalService,
    ) { }

  ngOnInit(): void {
    this.consultaListaSectores();
    this.consultaListaLocalidades();
    this.consultaListaAsuntos() ;
    this.consultaListaEstados() ;
    this.consultaListaProfesionales() ;
  }

  guardarRadicado() {
    let radicado : Pqrs = {
      objectid: 1,

     mes  : '10',
     x  : this.x,
     y : this.y,
     radicado : this.radicado,
     asunto_de_radicacion : this.asunto,
     direcciones : this.direccion,
     complemento_de_direcciones : this.complemento,
     razon_social_del_establecimient : this.razonSocial,
     sector_reportado : this.sector,
     localidad : this.localidad,
     causante_del_origen_quejoso : this.causante,
     estado_del_tramite: 1,
     observaciones_generales : this.observacion,
     profesional_asignado_primera_as  : this.profesional,
     profesional_que_diligencia : localStorage.getItem("username"),
     orig_fid:1,
     fecha_del_radicado  : this.fechaRadicado ,
     fecha_primera_asignacion : this.fechaPrimeraAsignacion,
     fecha_segunda_asignacion : 1, 
     profesional_asignado_segunda_as :'1',
     globalid :'00000',
    };

    this.radicadoService.guardarRadicado(radicado).subscribe(x => {
      x;
      console.log('Valor de retorno luego del registro :: ' , x);
      this.toastr.success('Registro Exitoso', radicado.radicado);
      this.route.navigate(['dashboard']);
    //   this.router.navigate(['etiquetado']);
    });

  }

  consultaListaSectores() {
     let sector : RuiSector ={ idSector:1, nombre:'xxx'};
     this.sectorService.consultaSector(sector).subscribe( x => { 
    
      x;
      console.log(x);
      this.listRuiSector = x;
    })
  }

  consultaListaLocalidades() {
    let localidad : RuiLocalidad ={ idLocalidad:1, nombre:'xxx'};
    this.localidadService.consultaLocalidad(localidad).subscribe( x => { 
   
     x;
     console.log(x);
     this.listRuiLocalidad = x;
   })
 }

 consultaListaAsuntos() {
  let asunto : RdoAsunto ={ idAsunto:1, nombre:'xxx'};
  this.asuntoService.consultaAsunto(asunto).subscribe( x => { 
 
   x;
   console.log(x);
   this.listRdoAsunto = x;
 })
}

consultaListaEstados() {
  let estado : RdoEstado ={ idEstado:1, nombre:'xxx'};
  this.estadoService.consultaEstado(estado).subscribe( x => { 
 
   x;
   console.log(x);
   this.listRdoEstado = x;
 })
}

consultaListaProfesionales() {
  let profesional : RdoProfesional ={ idProfesional:1, nombre:'xxx'};
  this.profesionalService.consultaProfesionales(profesional).subscribe( x => { 
 
   x;
   console.log(x);
   this.listProfesional = x;
 })
}

}
