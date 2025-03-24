import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contacts: any[] = [];
  showAddModal = false;
  showEditModal = false;
  newContact: any = { name: '', address: '', phone: '' };
  selectedContact: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchContacts();
  }

  // ✅ Fetch all contacts from backend
  fetchContacts() {
    this.http.get<any[]>('http://localhost:8080/contacts')
      .subscribe(data => {
        this.contacts = data;
      }, error => {
        console.error('Error fetching contacts:', error);
      });
  }

  // ✅ Open Add Contact Modal
  openAddModal() {
    this.showAddModal = true;
  }

  // ✅ Close Add Contact Modal
  closeAddModal() {
    this.showAddModal = false;
    this.newContact = { name: '', address: '', phone: '' };
  }

  // ✅ Save New Contact (POST Request)
  saveContact() {
    this.http.post<any>('http://localhost:8080/contacts', this.newContact)
      .subscribe(response => {
        console.log('Contact Added:', response);
        this.fetchContacts();  // ✅ Refresh data from backend
        this.closeAddModal();
      }, error => {
        console.error('Error adding contact:', error);
      });
  }
  

  // ✅ Open Edit Contact Modal
  openEditModal(contact: any) {
    this.selectedContact = { ...contact };
    this.showEditModal = true;
  }

  // ✅ Close Edit Contact Modal
  closeEditModal() {
    this.showEditModal = false;
  }

  // ✅ Update Contact (PUT Request)
  updateContact() {
    this.http.put(`http://localhost:8080/contacts/${this.selectedContact.id}`, this.selectedContact)
      .subscribe(() => {
        this.fetchContacts(); 
        this.closeEditModal();
      }, error => {
        console.error('Error updating contact:', error);
      });
  }

  // ✅ Delete Contact (DELETE Request)
  deleteContact(contactId: number) {
    if (confirm("Are you sure you want to delete this contact?")) {
      this.http.delete(`http://localhost:8080/contacts/${contactId}`) 
        .subscribe(() => {
          this.fetchContacts();
        }, error => {
          console.error('Error deleting contact:', error);
        });
    }
  }
}
