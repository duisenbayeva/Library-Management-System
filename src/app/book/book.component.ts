import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
     this.getCustomers();
  }

  getCustomers() {
    return this.bookService.getBooks()
               .subscribe(
                 books => {
                  console.log(books);
                  this.books = books
                 }
                );
 }

}
