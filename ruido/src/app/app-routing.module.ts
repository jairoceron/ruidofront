import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { EtiquetadoComponent } from './etiquetado/etiquetado/etiquetado.component';
import { RuidoComponent } from './ruido/ruido/ruido.component';
import { VisitaComponent } from './vistas/visita/visita.component';
import { RadicadoComponent } from './vistas/radicado/radicado.component';
import { NuevisitaComponent } from './vistas/nuevisita/nuevisita.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { VisitaprofesionalComponent } from './vistas/visitaprofesional/visitaprofesional.component';
import { AiresbcComponent } from './vistas/airesbc/airesbc.component';
import { PropvehiculoComponent } from './etiquetado/propvehiculo/propvehiculo.component';
import { PlacaComponent } from './etiquetado/placa/placa.component';
import { InfovehiculoComponent } from './etiquetado/infovehiculo/infovehiculo.component';
import { ObjetoplacaComponent } from './etiquetado/objetoplaca/objetoplaca.component';
import { VariableComponent } from './datalake/variable/variable.component';
import { DatabaseComponent } from './util/database/database.component';
import { AyudaComponent } from './etiquetado/ayuda/ayuda.component';
import { CiudadanoComponent } from './etiquetado/ciudadano/ciudadano.component';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path:'login', component:LoginComponent},
  { path:'eva/ciudadano', component:CiudadanoComponent},
  { path:'dashboard', component:DashboardComponent},
  { path:'etiquetado', component:EtiquetadoComponent},
  { path:'ruido', component:RuidoComponent},
  { path:'airesbc', component:AiresbcComponent},
  { path:'visita', component:VisitaComponent},
  { path:'radicado', component:RadicadoComponent},
  { path:'nueVisita', component:NuevisitaComponent}, 
  { path:'encabezado', component:HeaderComponent}, 
  { path:'visitaRuido', component:VisitaprofesionalComponent},
  { path:'propvehiculo', component:PropvehiculoComponent},
  { path:'listPlaca', component:PlacaComponent},
  { path:'infoVehic', component:InfovehiculoComponent},
  { path:'objetoPlaca', component: ObjetoplacaComponent},
  { path:'dataLake', component: VariableComponent},
  { path:'utilitario', component: DatabaseComponent},
  { path:'ayuda', component: AyudaComponent}, 
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    
  ]
})
export class AppRoutingModule { 

  
}
