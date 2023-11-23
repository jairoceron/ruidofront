import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ColumnaDataTable, EvaEtiquetado, Informacionvehiculo } from 'src/app/modelos/login.interface';
import { INFO_VEHICULO } from 'src/app/modelos/ruido.interface';
import { EtiquetadoService } from 'src/app/servicios/etiquetado.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
/**
 * Elements with symbol H will be highlighted
 */

@Component({
  selector: 'app-calculo',
  templateUrl: './calculo.component.html',
  styleUrls: ['./calculo.component.scss']
})
export class CalculoComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;


  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatSlideToggle, { static: true })
  stoggle!: MatSlideToggle;

  dataEvaEtiquetado: EvaEtiquetado[] = [];
  displayedColumns: ColumnaDataTable[] = [{ columna: 'clase', label: 'Clase' }];
  displayedColuXXX: string[] = [];



  // dataSource = ELEMENT_DATA;
  dataSource: MatTableDataSource<EvaEtiquetado> = new MatTableDataSource(this.dataEvaEtiquetado);
  //dataSource = this.dataEvaEtiquetado;

  informacionVehx : Informacionvehiculo = INFO_VEHICULO;

  constructor(private etService: EtiquetadoService,
    public dialog: MatDialog,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loadDisplayedColumns();
    this.loadDataset();
    this.loadDatasetParametroInforVehiculo();
    this.asociaDatasetBehaviorSubject();
  }

  public asociaDatasetBehaviorSubject() {
    this.etService.dataSouEvaEtiqueObservab.subscribe(
      x => {  
       // fffffffffffff6666666666666666
        this.dataSource = x;
        this.dataSource.paginator = this.paginator;
      }
    )
  }


  public loadDisplayedColumns() {
    // this.displayedColumns.push('CLASEPAPA');

    this.displayedColumns = [];
    this.displayedColuXXX = [];

    let columnaDataTable: ColumnaDataTable = { columna: 'clase', label: 'Clase' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('clase');

    columnaDataTable = { columna: 'combustible', label: 'Combustible' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('combustible');


    columnaDataTable = { columna: 'modelo', label: 'Modelo' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('modelo');


    columnaDataTable = { columna: 'estandaremision', label: 'Estandar Emisión' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('estandaremision');


    columnaDataTable = { columna: 'cilindrada', label: 'Cilindrada' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('cilindrada');


    // columnaDataTable  = {columna:'indiceetiquetado', label:'Indice Etiquetado'}
    // this.displayedColumns.push(columnaDataTable );
    // this.displayedColuXXX.push('indiceetiquetado');


    columnaDataTable = { columna: 'fe_co', label: 'fe_co' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('fe_co');


    columnaDataTable = { columna: 'fe_thc', label: 'fe_thc' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('fe_thc');

    columnaDataTable = { columna: 'fe_nox', label: 'fe_nox' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('fe_nox');

    columnaDataTable = { columna: 'fe_pm', label: 'fe_pm' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('fe_pm');

    columnaDataTable = { columna: 'fe_co2', label: 'fe_co2' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('fe_co2');

    columnaDataTable = { columna: 'fe_ch4', label: 'fe_ch4' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('fe_ch4');

    columnaDataTable = { columna: 'fe_co2eq', label: 'fe_co2eq' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('fe_co2eq');

    columnaDataTable = { columna: 'pn', label: 'pn' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('pn');

    columnaDataTable = { columna: 'pm_llsp', label: 'pm_llsp' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('pm_llsp');

    columnaDataTable = { columna: 'opa', label: 'opa' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('pm_llsp');

    columnaDataTable = { columna: 'fav', label: 'Fav' }
    this.displayedColumns.push(columnaDataTable);
    this.displayedColuXXX.push('fav');

    // columnaDataTable = { columna: 'etiquetado', label: 'Etiquetado' }
    // this.displayedColumns.push(columnaDataTable);
    // this.displayedColuXXX.push('etiquetado');


    // columnaDataTable = { columna: 'tipologiavehicular', label: 'Tipologia Vehicular' }
    // this.displayedColumns.push(columnaDataTable);
    // this.displayedColuXXX.push('tipologiavehicular');

   
  }

  public loadDatasetParametroInforVehiculo() {

    
    this.etService.infoVehObservab.subscribe( x => {

    
      this.informacionVehx  = x;
      this.etService.loadEvaEtiquetadoConParametro(this.informacionVehx).subscribe( 
        x => {
  
          x;
          this.dataSource = new MatTableDataSource(x);
          this.etService.actualizarDataSouEvaEtique(this.dataSource);
  
        this.dataSource.paginator = this.paginator;
        }

      )
    })

   /*
    this.etService.calculoFactosAmbiVehicularTipoVehicular(informVehiFAV).subscribe(x => {
     
      if (x == null) {
        this.evaEtiquetado = EVA_ETIQUETADO;
      } else {
        this.evaEtiquetado = x;
      }
    }); */
  }

  public loadDataset() {
    this.etService.loadEvaEtiquetado().subscribe(
      x => {
       
        this.dataEvaEtiquetado = x;
        // this.dataSource = x;
        this.dataSource = new MatTableDataSource(x);
       
        this.dataSource.paginator = this.paginator;
      }
    )
  }

}
