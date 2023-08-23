import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { DialogData, Placa } from 'src/app/modelos/login.interface';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, ViewChild} from '@angular/core';


@Component({
  selector: 'app-dialog-visor-pdf',
  templateUrl: './dialog-visor-pdf.component.html',
  styleUrls: ['./dialog-visor-pdf.component.scss'],
 
//  imports: [CdkDrag],
  
})
export class DialogVisorPdfComponent implements OnInit {



 //  @ViewChild(CdkDragHandle, { static: true }) handle: CdkDragHandle;

 // constructor(@Optional() @Inject(CDK_DRAG_PARENT) public cdk) {}

 /*
  ngAfterViewInit() {
    this.cdk._handles.length = 1;
    this.cdk._handles._results = [this.handle];
    this.cdk._handles.changes.next();
  }
  */

  constructor(private pdfService: NgxExtendedPdfViewerService,
    public dialogRef: MatDialogRef<DialogVisorPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public dataPlaca : DialogData ,
    
    
    ) {
     
    }
     

  ngOnInit(): void {
    this.cargaData()
  }

  srcPdf : string = './assets/documents/Quimica/2018/instructivo.pdf';
  public currentPdf: string = './assets/pdf/morfologia_muestra-2227501_usuario-2177.pdf';

cargaData() : void {
  // this.srcPdf  = './assets/documents/Quimica/2018/instructivo.pdf';
  // this.currentPdf = './assets/pdf/morfologia_muestra-2227501_usuario-2177.pdf';
  this.currentPdf = this.dataPlaca.rutaPdfInfoEtiqueta;
}

onNoClick(): void {
  this.dialogRef.close();
}

}
