import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username : string = '';

  checkOutForm  : FormGroup = new FormGroup({
    
  });

  constructor(private router:Router) { }

  ngOnInit(): void {
    
    this.username = localStorage.getItem("username") || this.username;
  }


  checOutFun(checkOutForm  : FormGroup ) {    
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.username = '';
      this.router.navigate(['login']);
    } 
    
}
