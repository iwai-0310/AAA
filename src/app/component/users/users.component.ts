import { Component, OnInit } from '@angular/core';
import { UserService} from 'src/app/service/user.service';
import {Response} from '../../inteface/response.interface'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  response:Response
  constructor(private userService:UserService){}
  ngOnInit(): void {
   this.userService.getUsers(12).subscribe(
    (results:any)=>{
      console.log(results)
      this.response=results
    }
   )
  }

}
