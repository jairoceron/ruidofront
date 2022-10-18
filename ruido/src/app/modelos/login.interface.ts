export interface LoginI {
    username:string;
    password:string;

}

export interface ClaseVehiculoI {
    idclasevehiculo:number;
    nombre:string;

}

export interface TipoCombustibleI {
	idtipocombustib : number;
	idclasevehiculo : number;
	nombre: string;
}

export interface EstadoEmisionI {
	idestanemision : number;
	idclasevehiculo : number;
	nombre: string;
}

export interface CilindradaI {
	idcilindrada : number;
	idclasevehiculo : number;
	nombre: string;
}

export interface CategoriaI {
	idcategoria : number;
	idclasevehiculo : number;
	nombre: string;
}

export interface PesoVehiculoI {
	idpesovehiculo : number;
	idclasevehiculo : number;
	nombre: string;
}
 