import { Injectable } from '@angular/core';
import  axios  from 'axios';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3000/api/v1/auth';

  constructor() { }
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, {
        email,
        password
      });
      return response.data;
    }
    catch (error) {
      console.log(error);

    }

    function logout() {
      localStorage.removeItem('token')
    }

    function getToken() {
      return localStorage.getItem('token')
    }

    function isAuteh(): boolean{
      if(getToken() !== null){
        return true;
      }else{
        return false;
    }
    }
}
}

