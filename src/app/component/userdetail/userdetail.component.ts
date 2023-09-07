import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import {User} from '../../inteface/user.interface'

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  
  user:User
  mode:'edit' | 'locked'='locked'
  buttonText:'Save'|'Edit'='Edit'

 constructor(private activatedRoute:ActivatedRoute,private userService:UserService){}
  
 ngOnInit(): void {
    this.user=(<User>(this.activatedRoute.snapshot.data['resolvedResponse'].results[0]))
    console.log(this.user)
    // this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
    //   console.log('User ID:',params.get('uuid')!)
    //   this.userService.getUser(params.get('uuid')!).subscribe(
    //     (response:any)=>{
    //       console.log(response)
    //       this.response=response
    //     }
    //   )
    // })
  }
 
changeMode(mode?: 'edit' | 'locked'):void{
  console.log(mode)
  this.mode=this.mode==='locked' ? 'edit':'locked'
  this.buttonText=this.buttonText==='Edit' ? 'Save':'Edit'
  if(mode==='edit'){
    //Logic to update user on the backend
    console.log('Updating user on the backend')
  }
}
  

 
}
