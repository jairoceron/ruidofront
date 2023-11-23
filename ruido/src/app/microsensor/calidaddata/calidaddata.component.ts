import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';
import { MicrosensorService } from 'src/app/servicios/microsensor.service';

@Component({
  selector: 'app-calidaddata',
  templateUrl: './calidaddata.component.html',
  styleUrls: ['./calidaddata.component.scss']
})
export class CalidaddataComponent implements OnInit {

  constructor(private etService:EtiquetadoService,
    private calidadMicrosensor : MicrosensorService,
    private router: Router) { }

  ngOnInit(): void {
  }

  procesoCalidadMicrosensores() {
    this.calidadMicrosensor.calidadMicrosensor().subscribe(
      x => {x;
     
      }
    )
  }

}
