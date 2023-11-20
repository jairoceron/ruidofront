import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ApiService } from '../../servicios/api.service';
import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorStatus: boolean = false;
  errorMsj: string = 'El usuario y/o contraseña son incorrectas';

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });



  constructor(private api: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    console.log("Esto debe salir de primeras ... ");
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    console.log('que trae esto ??? ', localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      // this.router.navigate(['dashboard']);  
      // 
    } else {
      this.router.navigate(['login']); 
    }
  }

  onLogin(form: LoginI) {

    console.log('este es el valor ::: ', this.loginForm.value);
    let fCUsername = this.loginForm.get("username");
    console.log(this.loginForm.controls);
    this.errorStatus = true;

    this.api.loginByEmail(form).subscribe(data => {
      data;
      console.log('retorna estoo ::: ', data);
      let dataResponse: ResponseI = data;
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("username", fCUsername?.value);
      console.log('Hasta aqui va bien ... ');
      // this.router.navigate(['dashboard']);  // si es un usuario válido debe ingresar al menú. 99999999
      this.router.navigate(['encabezado']);
      this.errorStatus = false;
      // if (dataResponse.status="ok") {

      // }



    });

  }

  ingresoCiudadano() {
    console.log('ingreso a eva ciudadano');
    this.router.navigate(['eva/ciudadano']);
  }

}
