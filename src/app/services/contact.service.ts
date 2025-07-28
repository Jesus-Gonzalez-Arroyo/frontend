import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../interfaces/contact.interface.js'

/**
 * @class ContactService
 * @description Encargado de manejar la lógica de acceso a datos relacionada con contactos.
 */

@Injectable()
export class ContactService {
  private api = 'http://localhost:3000/api/contacts';

  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<Array<[]>>(this.api);
  }

  createContact(data: Contact) {
    return this.http.post(this.api, data);
  }

  updateContact(id: string, data: Contact) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteContact(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}