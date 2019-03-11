import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-loans',
  templateUrl: './book-loans.component.html',
  styleUrls: ['./book-loans.component.css']
})
export class BookLoansComponent implements OnInit {

  displayedColumns: string[] = ['name', 'ssn', 'card_id', 'phone', 'address', 'email', 'actions'];

  constructor() { }

  ngOnInit() {
  }

}
