import { Book } from "./book";
import { Borrower } from "./borrower";

export class Loan {
    isbn: string;
    book: string;
    card_id: string;
    borrower: string;
    loan_id: string;
    date_out: Date;
    date_in: Date;
    due_date: Date;
    fine_amt: number;
    paid: boolean;

}

export interface LoanApi {
    items: Loan[];
    total_count: number;
}
