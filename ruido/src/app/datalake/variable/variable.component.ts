import { Component, OnInit } from '@angular/core';
import { FuenteDatoI, VariableAmbientalI, VariableSesionI } from 'src/app/modelos/response.interface';

@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.scss']
})
export class VariableComponent implements OnInit {

  selectedVariable: VariableAmbientalI = { idVariableAmbiental: 0, nombre: '' }
  selectedFuenteDato : FuenteDatoI = {   idFuenteDato: 0, nombre: '' }

  listVariable: VariableAmbientalI[] = [
    { nombre: 'SO2', idVariableAmbiental: 1 },
    { nombre: 'NO2', idVariableAmbiental: 2 },
    { nombre: 'CO', idVariableAmbiental: 3 },
    { nombre: 'OZONO', idVariableAmbiental: 4 },
    { nombre: 'PM10', idVariableAmbiental: 5 },
    { nombre: 'PM2.5', idVariableAmbiental: 6 },
    { nombre: 'Vel Viento', idVariableAmbiental: 18 },
    { nombre: 'Dir Viento', idVariableAmbiental: 19 },
    { nombre: 'Temperatura', idVariableAmbiental: 44 },
  ];

  listFuenteDato: FuenteDatoI[] = [
    { nombre: 'RMCAB', idFuenteDato: 1 },
    { nombre: 'Sensores Móviles', idFuenteDato: 2 },
    { nombre: 'Etiquetado Ambiental Vehicular EVA', idFuenteDato: 3 },
  ];

  constructor() { }

  ngOnInit(): void {
  }


  /**
   * --- SELECT * FROM RMCAB.TB_MONITOR_TYPE a WHERE a.MOT_MONITORTYPECODE IN (1, 2 ,3, 4, 5, 6, 18, 19, 44); ::: Base de datos RMCAB Oracle
1	SO2
2	NO2
3	CO
4	OZONO
5	PM10
6	PM2.5
18	Vel Viento
19	Dir Viento
44	Temperatura
   * 
   */


onChangeVariable(selectedVariable :  VariableAmbientalI) {
   console.log('Variable seleccionada ... ' , selectedVariable );

}

onChangeFuenteDato(selectedFuenteDato : FuenteDatoI) {
  console.log('Variable seleccionada ... ' , selectedFuenteDato );

}

}
