import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';
import { PropvehiculoComponent } from '../propvehiculo/propvehiculo.component';
import { EvaEtiquetado, Informacionvehiculo, LoginI } from 'src/app/modelos/login.interface';
import { CIUDADANO, INFO_VEHICULO, PASSWDCIUDADANO } from 'src/app/modelos/ruido.interface';
import { ApiService } from 'src/app/servicios/api.service';
import { ResponseI } from 'src/app/modelos/response.interface';
import { InfovehiculoComponent } from '../infovehiculo/infovehiculo.component';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/servicios/excel.service';

@Component({
  selector: 'app-ciudadano',
  templateUrl: './ciudadano.component.html',
  styleUrls: ['./ciudadano.component.scss']
})
export class CiudadanoComponent implements OnInit {
  

  disabled : boolean = true;

  excelData: EvaEtiquetado[] = [];
  errorStatus: boolean = false;
  public placa = '';
  infoVehiculo: Informacionvehiculo = INFO_VEHICULO;

  ngOnInit(): void {

    let form: LoginI = { username: CIUDADANO, password: PASSWDCIUDADANO }
    this.onLogin(form)
  }

  constructor(
    private etService: EtiquetadoService,
    public dialog: MatDialog,
    private router: Router,
    private api: ApiService,
    private excelService: ExcelService,
  ) { }

  habilitarBotones(event : any )  {
    if (this.placa.length == 6) {
      this.disabled = false;
    } else {
    this.disabled = true;
    }

  }



  abreFormCaracVehiculo(): void {
    this.infoVehiculo.placa = this.placa;
   
    const dialogRef = this.dialog.open(InfovehiculoComponent, {
      data: { dataVehiculo: this.infoVehiculo, },
    });

    /*
     dialogRef.afterClosed().subscribe(result => {
      
       this.router.navigate(['/etiquetado']);
 
     });
     */
  }

  readExcelPQRS(event: any) {
    
    let file = event.target.files[0];
   
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
   
    fileReader.onload = (e) => {
     
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
    
      var sheetNames = workBook.SheetNames;
     
      let i: number;
      for (i = 1; i <= 5; i++) {  // porque son las 5 hojas de calculo
        this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[i]])
        
        this.excelService.cargaDataEtiquetado(this.excelData).subscribe(x => { x; }

        
        );
      }

    }
  }


  openDiagol_propietVehiculo(): void {

    
    this.infoVehiculo.placa = this.placa;
    const dialogRef = this.dialog.open(PropvehiculoComponent, {
      data: { dataVehiculo: this.infoVehiculo, },
    });

    dialogRef.afterClosed().subscribe(result => {
     

    });
  }


  onLogin(form: LoginI) {

    //form.password = PASSWDCIUDADANO;
    //form.username = CIUDADANO;


    this.errorStatus = true;

    this.api.loginByEmail(form).subscribe(data => {
      data;
     
      let dataResponse: ResponseI = data;
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("username", CIUDADANO);
    
      this.errorStatus = false;
    


    });

  }

}
