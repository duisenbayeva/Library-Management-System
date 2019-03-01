import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Book } from '../model/book';

import { DataSource } from '@angular/cdk/collections';
import { Observable, merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material';
import { BookService } from '../services/book.service';



@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, AfterViewInit {
  //dataSource = new BookDataSource(this.bookService);
  displayedColumns: string[] = ['isbn', 'title', 'authors', 'actions'];
  books: Book[] = [];
  bookDatabase: BookService | null;

  filter: string = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //this.getBooks();
  }

  ngAfterViewInit() {

    this.bookDatabase = new BookService(this.http);
    console.log("request");
    //this.loadBooks();
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.bookDatabase!.getBooks(
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
      ).subscribe(data => this.books = data);
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  applyFilter(filterValue: string) {
    //this.books = filterValue.trim().toLowerCase();
    console.log("filter value: ", filterValue.trim().toLowerCase());
    this.filter = filterValue;
    //this.loadBooks();
    this.resultsLength = 0;
    this.isLoadingResults = true;
    this.isRateLimitReached = false;
    this.ngAfterViewInit();
  }

}
