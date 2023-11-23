import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/servicios/database.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  tableName : string = '';

  constructor(private databaseService : DatabaseService) { 

  }

  ngOnInit(): void {
  }

  generarEntityTablename() {
   
    this.databaseService.generarEntityTableName(this.tableName).subscribe(
      x => { 
        x; 
      
      } 
    )
  }

}
