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

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path:'login', component:LoginComponent},
  { path:'dashboard', component:DashboardComponent},
  { path:'etiquetado', component:EtiquetadoComponent},
  { path:'ruido', component:RuidoComponent},
  { path:'airesbc', component:AiresbcComponent},
  { path:'visita', component:VisitaComponent},
  { path:'radicado', component:RadicadoComponent},
  { path:'nueVisita', component:NuevisitaComponent}, 
  { path:'encabezado', component:HeaderComponent}, 
  { path:'visitaRuido', component:VisitaprofesionalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    
  ]
})
export class AppRoutingModule { 

  
}
