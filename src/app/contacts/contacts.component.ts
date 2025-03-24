import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: any[] = [];
  selectedContact: any = null;
  showEditModal = false;

  constructor(private http: HttpClient) {}

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
    this.selectedContact = { ...contact };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedContact = null;
  }

  updateContact() {
    this.http.put(`http://localhost:8080/contacts/${this.selectedContact.id}`, this.selectedContact)
      .subscribe(() => {
        alert('Contact updated successfully!');
        this.fetchContacts();
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
