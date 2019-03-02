import { Component, OnInit } from '@angular/core';


import { Location } from '@angular/common';
import { Borrower } from '../model/borrower';
import { BorrowerService } from '../services/borrower.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-add-borrower',
  templateUrl: './add-borrower.component.html',
  styleUrls: ['./add-borrower.component.css']
})

export class AddBorrowerComponent {

  borrower = new Borrower();
  submitted = false;
  message = "";

  constructor(
    private borrowerService: BorrowerService,
    private location: Location
  ) { }

  newBorrower(): void {
    this.submitted = false;
    this.borrower = new Borrower();
    console.log("new bor", this.borrower)
  }

  addBorrower() {
    this.save();
  }

  goBack(): void {
    this.location.back();
  }

  private save(): void {
    console.log("on save", this.borrower);
    this.borrowerService.addBorrower(this.borrower)
      .subscribe(data => {
        this.message = data.message;
        this.submitted = true;
        console.log("got response");
      });
  }
}
