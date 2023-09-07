// import { ResolveFn } from '@angular/router';
// import { Response } from '../inteface/response.interface';

import { Injectable } from "@angular/core";
import { Response } from "../inteface/response.interface";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UserService } from "./user.service";
import { Observable } from "rxjs/internal/Observable";

// constructor
// export const userResolver: ResolveFn<Response> = (route, state) => {
  
// };
@Injectable({providedIn:'root'})
export class userResolver implements Resolve<Response>{
  constructor(private userService:UserService){}

  resolve(route:ActivatedRouteSnapshot,_:RouterStateSnapshot):Observable<Response>{
    return this.userService.getUser(route.paramMap.get('uuid')!)
  }
}