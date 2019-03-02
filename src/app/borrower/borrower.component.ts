import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Borrower } from '../model/borrower';
import { BorrowerService } from '../services/borrower.service';

import { DataSource } from '@angular/cdk/collections';
import { Observable, merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  styleUrls: ['./borrower.component.css']
})
export class BorrowerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'ssn', 'card_id', 'phone', 'address', 'email'];

  borrowers: Borrower[] = [];
  borrowerDatabase: BorrowerService | null;

  filter: string = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) { }

  ngOnInit() {
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

}



