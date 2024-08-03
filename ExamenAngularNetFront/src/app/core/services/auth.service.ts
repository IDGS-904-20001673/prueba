import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { GeneralResponse } from '../../interfaces/general-response';
import { environment } from '../../../environments/environment.development';
import { login, register, user } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  async register(request: register){
    return await firstValueFrom(this.http.post<GeneralResponse<user>>(`${environment.api}sigup/insertUser`, request));
  }
 
  async login(request: login){
    return await firstValueFrom(this.http.post<GeneralResponse<user>>(`${environment.api}login/authenticate`, request));
  }
 
}
