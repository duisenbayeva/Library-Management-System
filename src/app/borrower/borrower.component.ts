import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Borrower } from '../model/borrower';
import { BorrowerService } from '../services/borrower.service';

import { DataSource } from '@angular/cdk/collections';
import { Observable, merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material';
import { Book } from '../model/book';
import { Router } from '@angular/router';
import { BorrowerLoans } from '../model/borrowerLoans';
import { Loan } from '../model/loan';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  styleUrls: ['./borrower.component.css']
})
export class BorrowerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'ssn', 'card_id', 'phone', 'address', 'email', 'actions'];

  borrowers: Borrower[] = [];
  borrowerDatabase: BorrowerService | null;

  filter: string = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  message = "";
  book: Book;
  loans: {};
  allLoans: Loan[];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.book = JSON.parse(localStorage.getItem('book'));
    this.loans = JSON.parse(localStorage.getItem("loans"));
    this.allLoans = JSON.parse(localStorage.getItem("allLoans"));
    if (this.loans == null) this.loans = {};
    if (this.allLoans == null) this.allLoans = [];
  }

  ngAfterViewInit() {

    this.borrowerDatabase = new BorrowerService(this.http);
    console.log("request");
    //this.loadBooks();
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.borrowerDatabase!.getBorrowers(
            this.filter, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.borrowers = data);
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  applyFilter(filterValue: string) {

    console.log("filter value: ", filterValue.trim().toLowerCase());
    this.filter = filterValue;
    //this.loadBooks();
    this.resultsLength = 0;
    this.isLoadingResults = true;
    this.isRateLimitReached = false;
    this.ngAfterViewInit();
  }

  checkOut(borrower) {
    console.log("on save", borrower);
    if (!localStorage.getItem('book')) {
      alert("choose book in books table first!");
    }
    else {
      this.borrowerDatabase.createBookLoan(borrower, this.book)
        .subscribe(data => {
          this.message = data.message;

          localStorage.removeItem('book');
          console.log(this.loans[borrower.card_id]);
          if (this.loans[borrower.card_id] == null) this.loans[borrower.card_id] = [];
          this.addLoan(this.book, borrower);

          //this.submitted = true;
          alert(this.message);
          console.log("got response");
        });
    }
  }

  addLoan(book: Book, borrower: Borrower) {
    var loan = new Loan();
    loan.isbn = book.isbn;
    loan.book = book.title;
    loan.card_id = borrower.card_id;
    loan.borrower = borrower.fname + " " + borrower.lname;
    loan.loan_id = "null";
    loan.date_out = new Date();
    loan.due_date = new Date();
    loan.due_date.setDate(loan.date_out.getDate() + 14);
    loan.fine_amt = 0;
    console.log(this.loans, this.loans[borrower.card_id]);
    this.loans[borrower.card_id].push(loan);
    this.allLoans.push(loan);
    localStorage.setItem('loans', JSON.stringify(this.loans));
    localStorage.setItem('allLoans', JSON.stringify(this.allLoans));
  }

  getLoans(borrower) {
    console.log("on loans of the borrower", borrower);
    // if (!localStorage.getItem('book')) {
    //   alert("choose book in books table first!");
    // }
    // else {
    // this.borrowerDatabase.createBookLoan(borrower, this.book)
    //   .subscribe(data => {
    //     this.message = data.message;
    //     localStorage.removeItem('book');
    //     //this.submitted = true;
    //     alert(this.message);
    //     console.log("got response");
    //   });
    // }

    var myurl = `${'loans'}`;
    localStorage.setItem("borrower", JSON.stringify(borrower));
    this.router.navigateByUrl(myurl);
  }
}



