import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Loan } from '../model/loan';
import { MatPaginator } from '@angular/material';
import { LoanService } from '../services/loan.service';
import { HttpClient } from '@angular/common/http';
import { Observable, merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Borrower } from '../model/borrower';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.borrower = JSON.parse(localStorage.getItem('borrower'));
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

        this.loans = JSON.parse(localStorage.getItem('allLoans'));
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
  }

  checkIn(loan: Loan) {
    console.log(loan);

  }
}
