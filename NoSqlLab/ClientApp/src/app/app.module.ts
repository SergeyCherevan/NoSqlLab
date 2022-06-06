import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { NotePageComponent } from './components/note-page/note-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthorizationFormComponent } from './components/authorization-form/authorization-form.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { AddNoteFormComponent } from './components/add-note-form/add-note-form.component';
import { NoteComponent } from './components/note/note.component';

import { AuthorizationService } from './services/authorization.service';
import { RequestService } from './services/request.service';

// определение маршрутов
const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'usersPage', component: UsersPageComponent },
  { path: 'accountPage/:username', component: AccountPageComponent },
  { path: 'notePage/:id', component: NotePageComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    UsersPageComponent,
    AccountPageComponent,
    NotFoundPageComponent,
    FooterComponent,
    AuthorizationFormComponent,
    ChangePasswordFormComponent,
    NoteComponent,
    AddNoteFormComponent,
    NotePageComponent,
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [ AuthorizationService, RequestService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
