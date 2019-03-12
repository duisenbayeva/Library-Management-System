import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoanApi } from "../model/loan";


@Injectable({
    providedIn: "root"
})
export class LoanService {

    private loansUrl = 'http://localhost:8080/api/loans';
    constructor(private http: HttpClient) { }

    getLoans(offset: number, pageSize: number): Observable<LoanApi> {
        console.log("search ..=", offset, pageSize)
        var url = "";

        url = `${this.loansUrl}/${offset}/${pageSize}`;


        return this.http.get<LoanApi>(url);

    }
}