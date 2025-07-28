import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from '../../services/contact.service';
import {Contact} from '../../interfaces/contact.interface'

/**
 * @class ContactListComponent
 * @description componente principal, obtiene todos los contactos y nos permite buscarlos o eliminarlos
 */
@Component({
  selector: 'app-contact-list',
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css',
  providers: [ContactService]
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];
  searchTerm = '';
  @Output() loaded = new EventEmitter<void>();

  constructor(
    private service: ContactService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getContacts().subscribe(data => {
      this.contacts = data;
      this.loaded.emit();
    });
  }

  create() {
    this.router.navigate(['/form']); 
  }

  edit(contact: Contact) {
    console.log('contact', contact)
    this.router.navigate(['/form'], { state: { contact } });
  }

  delete(id: string) {
    this.service.deleteContact(id).subscribe(() => this.load());
  }

  filteredContacts() {
    return this.contacts.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}