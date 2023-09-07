import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {Response} from '../inteface/response.interface'
import { User } from '../inteface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl:string='https://randomuser.me/api'
  constructor(private http:HttpClient) { }

  //fetch users
  getUsers(size:number=10):Observable<Response>{
    return this.http.get<Response>(`${this.apiUrl}/?results=${size}`)
    .pipe(map(this.processResponse))
  }
  //fetch a single user using uuid
  getUser(uuid:string):Observable<Response>{
    return this.http.get<Response>(`${this.apiUrl}/?uuid=${uuid}`)
    .pipe(map(this.processResponse))
  }

  private processResponse(response:Response):Response{
    return {
      info: {...response.info},
      results:response.results.map((user:any)=>(<User>{
        uuid:user.login.uuid,
        firstName:user.name.first,
        lastName:user.name.last,
        email:user.email,
        username:user.login.username,
        gender:user.gender,
        address:`House No:${user.location.street.number},${user.location.street.name},${user.location.city},${user.location.country}`,
        dateofBirth:user.dob.date,
        phone:user.phone,
        imageUrl:user.picture.medium,
        coordinate:{latitude:+user.location.coordinates.latitude,
        logitude:+user.location.coordinates.longitude}
      }))
    }
  }
}
