import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as XLSX from 'xlsx';
import { EvaEtiquetado } from '../modelos/login.interface';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private url = environment.ruidoURL;
  excelData: any;
  constructor(private http: HttpClient) { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }


  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }

  cargaDataExcel(visita: any[]): Observable<String> {
    let direccion = this.url + "cargaDataExcel";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<String>(direccion, visita, {
      'headers': customHeaders,
    });

  }

  cargaDatafffExcelPQRS(visita: any[]): Observable<String> {
    let direccion = this.url + "cargaDataExcelPQRS";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<String>(direccion, visita, {
      'headers': customHeaders,
    });

  }

  cargaDataEtiquetado(listEtiquetado: EvaEtiquetado[]): Observable<String> {
    let direccion = this.url + "cargaDataExcelEtiquetado";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<String>(direccion, listEtiquetado, {
      'headers': customHeaders,
    });

  }

  cargaDataExcelPQRS(visita: any[]): Observable<String> {
    let direccion = this.url + "cargaDataExcelPQRS";
    let lineax = "Bearer " + localStorage.getItem("token");
    let customHeaders = new HttpHeaders();
    customHeaders = customHeaders.append('content-type', 'application/json');
    customHeaders = customHeaders.append('Authorization', lineax);

    return this.http.post<String>(direccion, visita, {
      'headers': customHeaders,
    });

  }


}
