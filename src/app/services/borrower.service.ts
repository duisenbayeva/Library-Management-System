import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrower, BorrowerApi, BorrowerResponse } from '../model/borrower';
import { Book } from '../model/book';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class BorrowerService {
    private borrowersUrl = 'http://localhost:8080/api/borrowers';  // URL to web api
    constructor(private http: HttpClient) { }


    getBorrowers(search: string, offset: number, pageSize: number): Observable<BorrowerApi> {
        console.log("search ..=", search, offset, pageSize)
        var url = "";
        if (search.length == 0) {
            url = `${this.borrowersUrl}/${offset}/${pageSize}`;
        }
        else {
            url = `${this.borrowersUrl}/${offset}/${pageSize}/${search}`;
        }
        return this.http.get<BorrowerApi>(url);
    }

    //   getBorrower(id: number): Observable<Borrower> {
    //     const url = `${this.borrowersUrl}/${id}`;
    //     return this.http.get<Borrower>(url);
    //   }

    addBorrower(borrower: Borrower): Observable<BorrowerResponse> {
        return this.http.post<BorrowerResponse>(this.borrowersUrl, borrower, httpOptions);
    }

    createBookLoan(borrower: Borrower, book: Book): Observable<BorrowerResponse> {
        return this.http.post<BorrowerResponse>('http://localhost:8080/api/newloan', { borrower: borrower, book: book }, httpOptions);
    }

    //   deleteBorrower(borrower: Borrower | string): Observable<Borrower> {
    //     const isbn = typeof borrower === 'string' ? borrower : borrower.isbn;
    //     const url = `${this.borrowersUrl}/${isbn}`;

    //     return this.http.delete<Borrower>(url, httpOptions);
    //   }

    //   updateBorrower(borrower: Borrower): Observable<any> {
    //     return this.http.put(this.borrowersUrl, borrower, httpOptions);
    //   }
}