export class Borrower {
    fname: string;
    lname: string;
    card_id: string;
    ssn: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    email: string;
}

export interface BorrowerApi {
    items: Borrower[];
    total_count: number;
}

export class BorrowerResponse {
    borrower: Borrower;
    message: string;
}