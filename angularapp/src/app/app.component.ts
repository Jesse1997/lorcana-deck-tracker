import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isUserAuthenticated: boolean;

  constructor(private authService: AuthenticationService, private router: Router) { 
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }
  ngOnInit(): void {
    if(this.authService.isUserAuthenticated())
      this.authService.sendAuthStateChangeNotification(true);
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}