import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthorizationFormComponent } from './components/authorization-form/authorization-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccountPageComponent } from './components/account-page/account-page.component';

import { AuthorizationService } from './services/authorization.service';
import { RequestService } from './services/request.service';

// определение маршрутов
const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'usersPage', component: UsersPageComponent },
  { path: 'accountPage/:username', component: AccountPageComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    UsersPageComponent,
    AccountPageComponent,
    FooterComponent,
    AuthorizationFormComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [ AuthorizationService, RequestService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
