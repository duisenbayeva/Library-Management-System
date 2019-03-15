import { Borrower } from "./borrower";
import { Loan } from "./loan";
import { Book } from "./book";
import { LoanService } from "../services/loan.service";

export class BorrowerLoans {
    loans: Loan[];

    constructor() {
        this.loans = [];
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

        this.loans.push(loan);

    }

}