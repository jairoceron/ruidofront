export interface MetadataArchPDF {
    path: string;
    nameFile: string;
    descripcion: string;
    pathAssets: string;
}

export interface LoginI {
    username: string;
    password: string;

}

export interface ClaseVehiculoI {
    idclasevehiculo: number;
    nombre: string;
}

export interface TipologiaVehicular {
    idtipologiavehicular: number;
    nombre: string;
}

export interface ColumnaDataTable {
    columna: string;
    label: string;
}

export interface EvaEtiquetado{
     clasepapa : string ;  
     clase : string ;  
     combustible : string ; 
     modelo : string ;  
     estandaremision : string ; 
     cilindrada : string ;  
     indiceetiquetado : number ; 
     fe_co : number ;  
     fe_thc : number ; 
     fe_nox : number ; 
     fe_pm : number ;  
     fe_co2 : number ; 
     fe_ch4 : number ; 
     fe_co2eq : number ; 
     pn : number ;  
     pm_llsp : number ; 
     opa : number ;  
     fav : number ;  
     etiquetado : string ; 
     tipologiavehicular : string ; 
}

export interface TipoCombustibleI {
    idtipocombustib: number;
    idclasevehiculo: number;
    nombre: string;
}

export interface EstadoEmisionI {
    idestanemision: number;
    idclasevehiculo: number;
    nombre: string;
}

export interface MarcaI {
    idmarca: number;
    idclasevehiculo: number;
    nombre: string;
}

export interface CilindradaI {
    idcilindrada: number;
    idclasevehiculo: number;
    nombre: string;
}

export interface TipoServicioI {
    idtiposerv: number;
    nombre: string;
}

export interface CategoriaI {
    idcategoria: number;
    idclasevehiculo: number;
    nombre: string;
}

export interface PesoVehiculoI {
    idpesovehiculo: number;
    idclasevehiculo: number;
    nombre: string;
}

export interface Propietariovehiculo {
    idevapropvehi?: number;
    nombre1?: string;
    nombre2?: string;
    apellido1?: string;
    apellido2?: string;
    placa?: string;
    identificacion?: string;
    tipoidentifica?: number;
    email?: string;
    telefono?: string;


}

export interface DialogDataEtiquetado {
    dataVehiculo: Informacionvehiculo;
}

export interface FavEtiquetaColor {
    id:string;
    nombre:string;
}

export interface EvaEtiquetado {
    clasepapa : string ; 
    clase : string ;  
    combustible : string ;  
    modelo : string ;  
    estandaremision : string ; 
    cilindrada : string ;  
    indiceetiquetado : number ;  
    fe_co : number ;  
    fe_thc : number ;  
    fe_nox : number ;  
    fe_pm : number ;  
    fe_co2 : number ;  
    fe_ch4 : number ;  
    fe_co2eq : number ;  
    pn : number ;  
    pm_llsp : number ;  
    opa : number ;  
    fav : number ;  
    etiquetado : string ;  
}

export interface Informacionvehiculo {

    idevapropvehi: number;
    placa: string;
    tipologiaVehicular: string;
    tipoServicio: string;
    tipoCombustible: string;
    cilindraje: string;
    marca: string;
    linea: string;
    modelo: string;
    fechaImportacion: Date;
    capacidadCarga: string;
    capacidadPasajeros: string;
    claseVehiculo: string;
    numeroMotor: string;
    vin: string;
    ciudadMatricula: string;
    vigenciaRTM: string;
    tecnRedEmision: string;
    estEmisiVehic: string;
    subContEmision: string;

    determin_FAV: string;
    asoc_FAV_COLOR: string;
    densidad_HUMO: number;
    cum_LIM_D_HUMO: string;
    con_MAT_PARTIC: number;
    con_NUM_PARTIC: number;
    color_ETIQUETA: string;
    fecha_ETIQUETA: Date;
    fecha_VIG_FIN_ETIQUETA: Date;


}

export interface Placa {
    placa?: string;

    informacionvehiculo: Informacionvehiculo;
    propietariovehiculo: Propietariovehiculo;
}

export interface DialogData {
    rutaPdfHolograma: string;
    rutaPdfInfoEtiqueta: string;
}


export interface AllTabsColumns {

    TABLE_NAME: string;
    COLUMN_NAME: string;
    OWNER: string;
    DATA_TYPE: string;
    DATA_TYPE_MOD: string;
    DATA_TYPE_OWNER: string;
    DATA_LENGTH: number;
    DATA_PRECISION: number;
    DATA_SCALE: number;
    NULLABLE: string;
    COLUMN_ID: number;
    DEFAULT_LENGTH: number;
    DATA_DEFAULT: number;
    NUM_DISTINCT: number;
    LOW_VALUE: string;
    HIGH_VALUE: string;
    DENSITY: number;
    NUM_NULLS: number;
    NUM_BUCKETS: number;
    LAST_ANALYZED: Date;
    SAMPLE_SIZE: number;
    CHARACTER_SET_NAME: string;
    CHAR_COL_DECL_LENGTH: number;
    GLOBAL_STATS: string;
    USER_STATS: string;
    AVG_COL_LEN: number;
    CHAR_LENGTH: number;
    CHAR_USED: string;
    V80_FMT_IMAGE: string;
    DATA_UPGRADED: string;
    HIDDEN_COLUMN: string;
    VIRTUAL_COLUMN: string;
    SEGMENT_COLUMN_ID: number;
    INTERNAL_COLUMN_ID: number;
    HISTOGRAM: string;
    QUALIFIED_COL_NAME: string;

}

