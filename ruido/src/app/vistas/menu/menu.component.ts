import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modulousuario } from 'src/app/modelos/ruido.interface';
import { ModulousuarioService } from 'src/app/servicios/modulousuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  moduloUsuario: Modulousuario[] = [];

  constructor(private router:Router,
    private modulousuarioService : ModulousuarioService) { }

  ngOnInit(): void {
    this.cargaModulosUsuario();
  }

  irPrincipal() :void {
    this.router.navigate(['dashboard']);
  }

  irModulo(modulo : string) :void {
    this.router.navigate([modulo]);
  }
  

  cargaModulosUsuario() {
    this.modulousuarioService.cargaModuloUsuario().subscribe(
      x => { 
        this.moduloUsuario = x;        
      }
    )  ;
  }
}
