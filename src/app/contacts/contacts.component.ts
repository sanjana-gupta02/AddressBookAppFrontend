import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: any[] = [];
  selectedContact: any = null;
  showEditModal = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchContacts();
  }

  fetchContacts() {
    this.http.get<any[]>('http://localhost:8080/contacts')
      .subscribe(data => {
        this.contacts = data;
      }, error => {
        console.error('Error fetching contacts:', error);
      });
  }

  openEditModal(contact: any) {
    if (contact) {
      console.log("Editing Contact:", contact); // Debugging
      this.selectedContact = JSON.parse(JSON.stringify(contact)); // ✅ Deep copy to avoid two-way binding issues
      this.showEditModal = true;
    } else {
      console.error("Error: Contact data is undefined.");
    }
  }
  


  closeEditModal() {
    this.showEditModal = false;
    this.selectedContact = null;
  }

  // ✅ FIXED: Ensure updateContact works correctly
  updateContact() {
    if (!this.selectedContact || !this.selectedContact.id) {
      console.error("Error: No contact selected for update.");
      return;
    }

    this.http.put(`http://localhost:8080/contacts/${this.selectedContact.id}`, this.selectedContact)
      .subscribe(() => {
        alert('Contact updated successfully!');
        this.fetchContacts(); // Refresh contact list after update
        this.closeEditModal();
      }, error => {
        console.error('Error updating contact:', error);
      });
  }

  deleteContact(id: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.http.delete(`http://localhost:8080/contacts/${id}`)
        .subscribe(() => {
          this.fetchContacts();
        }, error => {
          console.error('Error deleting contact:', error);
        });
    }
  }
}
