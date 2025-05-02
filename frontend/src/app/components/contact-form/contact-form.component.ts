import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  @Input() contact: Contact = { id: 0, fullName: '', email: '', phone: '', isFavorite: false };
  @Output() save = new EventEmitter<Contact>();

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      fullName: [this.contact.fullName, [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      email: [this.contact.email, [Validators.required, Validators.email]],
      phone: [this.contact.phone, [Validators.pattern('^(\\(?\\d{3}\\)?[-.\\s]?)?\\d{3}[-.\\s]?\\d{4}$|^\\d{10}$')]],
      isFavorite: [this.contact.isFavorite]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.save.emit(this.contactForm.value);  // Emit the contact data to the parent
      this.contactForm.reset();  // Reset the form after submission
    }
  }
}