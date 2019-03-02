import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { BookComponent } from './book/book.component';
import { BookLoansComponent } from './book-loans/book-loans.component';
import { BorrowerComponent } from './borrower/borrower.component';

import { MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BorrowerDetailsComponent } from './borrower-details/borrower-details.component';
import { AddBorrowerComponent } from './add-borrower/add-borrower.component';
import { FinesComponent } from './fines/fines.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerDetailsComponent,
    AddCustomerComponent,
    BookComponent,
    BookLoansComponent,
    BorrowerComponent,
    BorrowerDetailsComponent,
    AddBorrowerComponent,
    FinesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
