import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list'
import { ContactFormComponent } from './components/contact-form/contact-form'

export const routes: Routes = [
    {path: '', component: ContactListComponent},
    {path: 'form', component: ContactFormComponent}
];
