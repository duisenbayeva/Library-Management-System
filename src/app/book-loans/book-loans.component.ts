import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Loan } from '../model/loan';
import { MatPaginator } from '@angular/material';
import { LoanService } from '../services/loan.service';
import { HttpClient } from '@angular/common/http';
import { Observable, merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Borrower } from '../model/borrower';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-loans',
  templateUrl: './book-loans.component.html',
  styleUrls: ['./book-loans.component.css']
})
export class BookLoansComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['borrower', 'book', 'date_out', 'due_date',
    'date_in', 'fine', 'paid', 'actions'];


  loans: Loan[] = [];
  loanDatabase: LoanService | null;

  filter: string = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  message = "";
  loan: Loan;
  borrower: Borrower;
  borrowerId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.borrower = JSON.parse(localStorage.getItem('borrower'));
    this.borrowerId = +this.route.snapshot.paramMap.get('borrowerId');
  }


  ngAfterViewInit(): void {
    this.loanDatabase = new LoanService(this.http);
    console.log("request");
    //this.loadBooks();
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.loanDatabase!.getLoans(this.paginator.pageIndex, this.paginator.pageSize);
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
      ).subscribe(data => {
        console.log(this.borrowerId);
        if (this.borrowerId != 0) {
          this.loans = JSON.parse(localStorage.getItem('loans'))[this.borrowerId];
        } else {
          var tempLoans = JSON.parse(localStorage.getItem('loans'));
          let tmp = [];
          Object.keys(tempLoans).map(function (key, value) {
            tmp = tmp.concat(tempLoans[key]);
          });
          this.loans = tmp;
          console.log("combined =", tmp);
        }


      });

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

  updateLoans() {
    console.log("update loans");
    var today = new Date();
    var loans = JSON.parse(localStorage.getItem('loans'));

    for (var k in loans) {
      for (var i = 0; i < loans[k].length; i++) {

        if (loans[k][i].date_in && loans[k][i].date_in > loans[k][i].due_date && !loans[k][i].paid) {

          let diffMs = (new Date(loans[k][i].date_in).getTime() - new Date(loans[k][i].due_date).getTime()); // milliseconds
          let diffDays = Math.floor(diffMs / 86400000); // days

          loans[k][i].fine_amt = diffDays * 0.25;
          console.log("late return, not paid", diffDays);

        } else if (!loans[k][i].date_in && today.getTime() > new Date(loans[k][i].due_date).getTime()) {

          let diffMs = (today.getTime() - new Date(loans[k][i].due_date).getTime()); // milliseconds
          let diffDays = Math.floor(diffMs / 86400000); // days

          loans[k][i].fine_amt = diffDays * 0.25;
          console.log("late, not returned", diffDays);


        } else {
          console.log("alright");
          loans[k][i].fine_amt = 0;
        }
        //console.log(loans[k][i]);
      }
    }

    localStorage.setItem('loans', JSON.stringify(loans));

  }

  checkIn(loan: Loan) {

    var tempLoans = JSON.parse(localStorage.getItem('loans'));
    for (var i = 0; i < tempLoans[loan.card_id].length; i++) {
      if (tempLoans[loan.card_id][i].isbn == loan.isbn) {
        console.log(i, this.loans[i]);

        //this.loans.splice(i, 1);

        tempLoans[loan.card_id][i].date_in = new Date();

        console.log(tempLoans[loan.card_id][i]);

        //tempLoans[this.borrowerId] = this.loans;
        localStorage.setItem('loans', JSON.stringify(tempLoans));
        alert("Successfully checked in!");

      }

    }

  }
}
