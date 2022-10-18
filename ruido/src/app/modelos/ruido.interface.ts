import { timestamp } from "rxjs";

export interface ConsultaVisita {
    fechaInicial : Date;
    fechaFinal   : Date;
    radicado     : string; 
}

export interface RuiSector {
  idSector : number;
  nombre : string;
} 

export interface RdoAsunto {
     idAsunto : number;
     nombre : string;
   } 
   export interface RdoEstado {
     idEstado : number;
     nombre : string;
   }    
   export interface RdoProfesional {
     idProfesional : number;
     nombre : string;
   }    

export interface RuiLocalidad {
     idSector : number;
     nombre : string;
   } 

export interface Pqrs {
     objectid: number;
   //  ano : string;
     mes  : string;
     x  : string;
     y : string;
     radicado : string;
     asunto_de_radicacion : string;
     direcciones : string;
     complemento_de_direcciones : string;
     razon_social_del_establecimient : string;
     sector_reportado : string;
     localidad : string;
     causante_del_origen_quejoso : string;
     estado_del_tramite: number;
     observaciones_generales : string;
     profesional_asignado_primera_as  : string;
     profesional_que_diligencia : string |null;
     orig_fid:number;
     fecha_del_radicado  : Date ;
     fecha_primera_asignacion : Date ;
     fecha_segunda_asignacion : number ;
     profesional_asignado_segunda_as :string ;
     globalid : string;

}    

export interface Visitas {
 
     id : number;
     objectid : number;
      año : number;
      mes: string ;
      latitud: string ;
      longitud: string ;
      profesional_encargado: string ;
      radicado: string ;
      actividad_a_realizar_segun_plan: string ;
      estado_de_la_visita: string ;
      solo_si_la_visita_no_fue_efecti: string ;
      solo_si_la_visita_fue_efectiva_: string ;
      gestion: string ;
      observaciones_al_motivo: string ;
      numero_de_expediente: string ;
      proceso_actuacion_tecnica_o_res: string ;
      nombre_comercial: string ;
      razon_social: string ;
      codigo_ciiu: string ;
      matricula_mercantil: string ;
      nit: string ;
      representante_legal: string ;
      numero: string ;
      telefono: string ;  
      direccion__via_: string ;
      direccion__numero_: string ; 
      direccion__letra_: string ;  
      direccion__bis_: string ; 
      direccion__cuadrante_ : string ;
      direccion__numero1: string ;
      direccion__letra1: string ;
      direccion__bis1: string ;
      direccion__placa_: string ;
      direccion__cuadrante1: string ;   
      tipo: string ;
      tipo_de_predio_generador_de_la_: string ; 
      actividad_especifica: string ;
      localidad : number;
      upz: string ;
      cumplimiento_normativo: string ;
      horario_de_la_visita: string ; 
      lequemision_n_db_a_: number;  
      sellamiento_codigo_de_la_polici: string ; 
      valor_para_comparar_con_la_norm: string ;
      visita_programada: string ;  
      area_de_actividad_segun_sinupot: string ;  
      observaciones_de_area_de_activi: string ;  
      tipo_documento: string ; 
      direccion: string ;
      municipio: string ;
      barrio: string ;
      orig_fid: number;
      globalid : string ; 
   }   