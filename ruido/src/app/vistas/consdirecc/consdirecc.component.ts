import { Component, OnInit } from '@angular/core';
import { ConsultaVisita, CONS_POR_DIRECCION } from 'src/app/modelos/ruido.interface';
import { ConsultaService } from 'src/app/servicios/consulta.service';

@Component({
  selector: 'app-consdirecc',
  templateUrl: './consdirecc.component.html',
  styleUrls: ['./consdirecc.component.scss']
})
export class ConsdireccComponent implements OnInit {

  consultaVisita : ConsultaVisita = new ConsultaVisita();
 // direccion :string = '';
  constructor(private consultaService : ConsultaService) { }

  ngOnInit(): void {
    this.actualizarDireccionServicio();
  }

actualizarDireccionServicio() {
  this.consultaService.updateDireccion(this.consultaVisita.direccion);  
  this.consultaService.setVistaSistema(CONS_POR_DIRECCION);
  //.setConsultaActual(consultaVisita);

}

onBlur(): void {
  console.log('Focus Is Lost for this Element ' + this.consultaVisita.direccion);
  this.actualizarDireccionServicio();
}

}
