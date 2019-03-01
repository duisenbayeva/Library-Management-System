import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { BookComponent } from '../book/book.component';
import { AddBorrowerComponent } from '../add-borrower/add-borrower.component';
import { BorrowerComponent } from '../borrower/borrower.component';


const routes: Routes = [
  {
    path: 'books',
    component: BookComponent
  },
  {
    path: 'customers',
    component: CustomerComponent
  },
  {
    path: 'customer/add',
    component: AddCustomerComponent
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path: 'borrower/add',
    component: AddBorrowerComponent
  },
  {
    path: 'borrowers',
    component: BorrowerComponent
  },
  {
    path: 'borrowers/:id',
    component: CustomerDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }