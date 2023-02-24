import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './vistas/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EtiquetadoComponent } from './etiquetado/etiquetado/etiquetado.component';
import { RuidoComponent } from './ruido/ruido/ruido.component';
import { VacioComponent } from './vacio/vacio.component';
import { VisitaComponent } from './vistas/visita/visita.component';
import { RadicadoComponent } from './vistas/radicado/radicado.component';
import { MenuComponent } from './vistas/menu/menu.component';
import {ToastrModule} from 'ngx-toastr';
import { NuevisitaComponent } from './vistas/nuevisita/nuevisita.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { VisitaprofesionalComponent } from './vistas/visitaprofesional/visitaprofesional.component';
import { UpdvisitprofesComponent } from './vistas/updvisitprofes/updvisitprofes.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartlocalidadComponent } from './vistas/chartlocalidad/chartlocalidad.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { ChartestadotramiteComponent } from './vistas/chartestadotramite/chartestadotramite.component';
import { PoligonruidoComponent } from './vistas/poligonruido/poligonruido.component';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { ConsdireccComponent } from './vistas/consdirecc/consdirecc.component';
import { ConslocalidadComponent } from './vistas/conslocalidad/conslocalidad.component';
import { ConsestramiteComponent } from './vistas/consestramite/consestramite.component';
import { ConstipopredioComponent } from './vistas/constipopredio/constipopredio.component';
import { ChartgenericoComponent } from './vistas/chartgenerico/chartgenerico.component';
import { Chart2DgenericoComponent } from './vistas/chart2-dgenerico/chart2-dgenerico.component';
import { AiresbcComponent } from './vistas/airesbc/airesbc.component';
import { ChartpieComponent } from './vistas/chartgenerico/chartpie/chartpie.component';
import { CumpnormaComponent } from './vistas/cumpnorma/cumpnorma.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    EtiquetadoComponent,
    RuidoComponent,
    VacioComponent,
    VisitaComponent,
    RadicadoComponent,
    MenuComponent,
    NuevisitaComponent,
    VisitaprofesionalComponent,
    UpdvisitprofesComponent,
    ChartlocalidadComponent,
    ChartestadotramiteComponent,
    PoligonruidoComponent,
    ConsdireccComponent,
    ConslocalidadComponent,
    ConsestramiteComponent,
    ConstipopredioComponent,
    ChartgenericoComponent,
    Chart2DgenericoComponent,
    AiresbcComponent,
    ChartpieComponent,
    CumpnormaComponent,
  
    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatSliderModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatMenuModule,
    MatGridListModule,
    NgChartsModule,
    NgxChartsModule,
    LeafletMarkerClusterModule
  ],
  entryComponents: [RuidoComponent, EtiquetadoComponent,VacioComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
