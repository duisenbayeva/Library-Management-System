import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrower, BorrowerApi } from '../model/borrower';

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

    addBorrower(borrower: Borrower): Observable<Borrower> {
        return this.http.post<Borrower>(this.borrowersUrl, borrower, httpOptions);
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