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
    
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    
    if (localStorage.getItem("token")) {
      // this.router.navigate(['dashboard']);  
      // 
    } else {
      this.router.navigate(['login']); 
    }
  }

  onLogin(form: LoginI) {

   
    let fCUsername = this.loginForm.get("username");
   
    this.errorStatus = true;

    this.api.loginByEmail(form).subscribe(data => {
      data;
   
      let dataResponse: ResponseI = data;
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("username", fCUsername?.value);
   
      
      this.router.navigate(['encabezado']);
      this.errorStatus = false;
      

    });

  }

  ingresoCiudadano() {
   
    this.router.navigate(['eva/ciudadano']);
  }

}
