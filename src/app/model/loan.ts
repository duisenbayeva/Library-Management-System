export interface Loan {
    isbn: string;
    borrower_id: string;
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
