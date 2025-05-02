import { Component, OnInit } from '@angular/core';
import { ContactService, Contact } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  newContact: Contact = { id: 0, fullName: '', email: '', phone: '', isFavorite: false };
  editMode: Contact | null = null;
  isAddContactFormVisible: boolean = false; 

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe((data) => {
      this.contacts = data;
    });
  }

  addNewContact(): void {
    this.editMode = null;
    this.newContact = { id: 0, fullName: '', email: '', phone: '', isFavorite: false };  // Reset form fields
    this.isAddContactFormVisible = true;  
  }

  saveContact(contact: Contact): void {
    if (this.editMode) {
      this.contactService.updateContact(contact.id, contact)
        .subscribe(updated => {
          const i = this.contacts.findIndex(c => c.id === updated.id);
          this.contacts[i] = updated;
          this.resetForm();
        });
    } else {
      this.contactService.createContact(contact)
        .subscribe(created => {
          this.contacts.push(created);
          this.resetForm();
        });
    }
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact.id, contact).subscribe(() => {
      this.loadContacts();  
      this.editMode = null;
    });
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe(() => {
      this.contacts = this.contacts.filter(contact => contact.id !== id); 
    });
  }

  editContact(contact: Contact): void {
    this.editMode = contact;
    this.newContact = { ...contact }; 
    this.isAddContactFormVisible = true; 
  }

  closeForm(): void {
    this.isAddContactFormVisible = false; // Close form when user clicks the close button
  }

  private resetForm() {
    this.isAddContactFormVisible = false;
    this.editMode = null;
    this.newContact = { id: 0, fullName: '', email: '', phone: '', isFavorite: false };
  }
}