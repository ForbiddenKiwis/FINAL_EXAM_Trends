import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
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
export class ContactFormComponent implements OnChanges {
  @Input() contact: Contact = { id: 0, fullName: '', email: '', phone: '', isFavorite: false };
  @Output() save = new EventEmitter<Contact>();
  @Output() close = new EventEmitter<void>();

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      id: [this.contact.id],
      fullName: [this.contact.fullName, [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      email: [this.contact.email, [Validators.required, Validators.email]],
      phone: [this.contact.phone, [Validators.pattern('^(\\(?\\d{3}\\)?[-.\\s]?)?\\d{3}[-.\\s]?\\d{4}$|^\\d{10}$')]],
      isFavorite: [this.contact.isFavorite]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contact'] && this.contactForm) {
      this.contactForm.patchValue(this.contact);
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.save.emit(this.contactForm.value); 
      this.contactForm.reset();  
    }
  }

  cancel() {
    this.contactForm.reset();
    this.close.emit();  // Emit close event to parent component
  }
}