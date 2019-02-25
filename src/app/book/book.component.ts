import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import {DataSource} from '@angular/cdk/collections';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  dataSource = new BookDataSource(this.bookService);
  displayedColumns = ['isbn', 'title', 'authors', 'available'];
  books: Book[];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
     //this.getBooks();
  }

  getBooks() {
    return this.bookService.getBooks()
               .subscribe(
                 books => {
                  console.log(books);
                  this.books = books
                 }
                );
 }

}

export class BookDataSource extends DataSource<any> {
  constructor(private bookService: BookService) {
    super();
  }
  connect(): Observable<Book[]> {
    return this.bookService.getBooks();
  }
  disconnect() {}
}
