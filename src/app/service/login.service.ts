import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API_URL = 'https://dev-api-login-test.azurewebsites.net/Token';
  
  constructor(private httpClient: HttpClient) { }

  loginWithEmail(encodedCredentials: string){
    const headers = new HttpHeaders({
      'Authorization': `Basic ${encodedCredentials}`,
    });

    return this.httpClient.post(this.API_URL, {}, {headers});
  }
}
