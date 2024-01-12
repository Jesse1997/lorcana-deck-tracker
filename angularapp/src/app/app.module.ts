import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { PrivacyComponent } from './privacy/privacy.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    PrivacyComponent,
    ForbiddenComponent,
    SpinnerComponent
    ],
  imports: [
    BrowserModule, HttpClientModule,
    RouterModule.forRoot([
      { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
      { path: 'faq', loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule), canActivate: [AuthGuard] },
      { path: 'updates', loadChildren: () => import('./updates/updates.module').then(m => m.UpdatesModule), canActivate: [AuthGuard] },
      { path: 'deck', loadChildren: () => import('./deck/deck.module').then(m => m.DeckModule), canActivate: [AuthGuard] },
      { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'forbidden', component: ForbiddenComponent }
  ], { useHash: true }),
  JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      allowedDomains: ["localhost:7180", "https://webapi20240109092356.azurewebsites.net"],
      disallowedRoutes: []
    }
  }),
  FontAwesomeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
