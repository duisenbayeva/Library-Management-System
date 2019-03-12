export interface Loan {
    isbn: string;
    book: string;
    card_id: string;
    borrower: string;
    loan_id: string;
    date_out: string;
    date_in: string;
    due_date: string;
    fine_amt: number;
    paid: boolean;
}

export interface LoanApi {
    items: Loan[];
    total_count: number;
}
