import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Contact, Error} from '../../interfaces/contact.interface'

/**
 * @class ContactFormComponent
 * @description componente con la vista y funciones para agregar y actualizar los contactos
 */

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.css'],
  providers: [ContactService]
})
export class ContactFormComponent {
  @Output() refresh = new EventEmitter<void>();
  form: FormGroup;
  isEditing = false;
  contactId: string | null = null;
  contact: Contact | null = null;

  constructor(
    private fb: FormBuilder,
    private service: ContactService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.contact = navigation?.extras?.state?.['contact'] || null;

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });

    if (this.contact) {
      this.isEditing = true;
      this.contactId = this.contact._id ?? null;
      this.form.patchValue(this.contact);
    }
  }

  onSubmit() {
    if (!this.form.valid) return;

    const contact = this.form.value;

    if (this.isEditing && this.contactId) {
      this.service.updateContact(this.contactId, contact).subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err)
      });
    } else {
      this.service.createContact(contact).subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err)
      });
    }
  }

  private handleSuccess() {
    this.refresh.emit();
    this.resetForm();
  }

  private handleError(error: Error) {
    if (error?.error?.error) {
      alert(error.error.error);
    } else {
      alert('Ocurrió un error inesperado. Intenta de nuevo.');
    }
  }

  private resetForm() {
    this.form.reset();
    this.isEditing = false;
    this.contactId = null;
    this.router.navigate(['/']);
  }
}
