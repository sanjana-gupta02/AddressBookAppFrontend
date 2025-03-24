import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {
  newContact: any = {
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  saveContact() {
    this.http.post('http://localhost:8080/contacts', this.newContact)
      .subscribe(() => {
        alert('Contact added successfully!');
        this.router.navigate(['/']);
      }, error => {
        console.error('Error adding contact:', error);
      });
  }
}
