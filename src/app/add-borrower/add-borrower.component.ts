import { Component, OnInit } from '@angular/core';


import { Location } from '@angular/common';
import { Borrower } from '../model/borrower';


@Component({
  selector: 'app-add-borrower',
  templateUrl: './add-borrower.component.html',
  styleUrls: ['./add-borrower.component.css']
})

export class AddBorrowerComponent {

  borrower = new Borrower();
  submitted = false;

  constructor(
    // private borrowerService: BorrowerService,
    private location: Location
  ) { }

  newBorrower(): void {
    this.submitted = false;
    this.borrower = new Borrower();
  }

  addBorrower() {
    this.submitted = true;
    this.save();
  }

  goBack(): void {
    this.location.back();
  }

  private save(): void {
    console.log(this.borrower);
    //this.borrowerService.addBorrower(this.borrower)
    // .subscribe();
  }
}
