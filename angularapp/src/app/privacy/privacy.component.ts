import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  public claims: Claim[] = [];
  constructor(private _authenticationService: AuthenticationService) { }
  ngOnInit(): void {
    this.getClaims();
  }
  public getClaims = () =>{
    this._authenticationService.getClaims('cards/privacy')
    .subscribe(res => {
      this.claims = res as [];
    })
  }
}

interface Claim {
    type: string,
    value: string
}
