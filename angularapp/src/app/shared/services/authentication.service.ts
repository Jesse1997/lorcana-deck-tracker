import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { AuthResponseDto } from 'src/app/interfaces/response/authResponseDto';
import { RegistrationResponseDto } from 'src/app/interfaces/response/registrationResponseDto';
import { ForgotPasswordDto } from 'src/app/interfaces/user/forgotPasswordDto';
import { ResetPasswordDto } from 'src/app/interfaces/user/resetPasswordDto';
import { UserForAuthenticationDto } from 'src/app/interfaces/user/userForAuthenticationDto';
import { UserForRegistrationDto } from 'src/app/interfaces/user/userForRegistrationDto';
import { CustomEncoder } from '../customEncoder';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this.http.post<RegistrationResponseDto> (route, body);
  }

  public loginUser = (route: string, body: UserForAuthenticationDto) => {
    return this.http.post<AuthResponseDto>(route, body);
  }

  public forgotPassword = (route: string, body: ForgotPasswordDto) => {
    return this.http.post(route, body);
  }

  public resetPassword = (route: string, body: ResetPasswordDto) => {
    return this.http.post(route, body);
  }

  public confirmEmail = (route: string, token: string, email: string) => {
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);
    return this.http.get(route, { params: params });
  }
  
  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
 
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public getClaims = (route: string) => {
    return this.http.get(route);
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");
    const decodedToken = this.jwtHelper.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  
    return role === 'Administrator';
  }
}