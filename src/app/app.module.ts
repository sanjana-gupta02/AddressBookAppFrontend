import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ContactsComponent } from './contacts/contacts.component';
import { AddPersonComponent } from './add-person/add-person.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    AddPersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // ✅ Routing module
    HttpClientModule,   // ✅ Enables HTTP requests
    FormsModule         // ✅ Required for [(ngModel)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
