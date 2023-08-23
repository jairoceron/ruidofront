export interface ResponseI {
    status:string;
    result:string;
    jwt:any
}

export interface VariableSesionI {
    username:string;
    modulo:string[];
    menu:string[];
}


export interface VariableAmbientalI {
    idVariableAmbiental: number;
    nombre:string;    
}

export interface FuenteDatoI{
    idFuenteDato: number;
    nombre:string;    
}

