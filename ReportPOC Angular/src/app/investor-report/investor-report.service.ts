import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    })
};

@Injectable()
export class ReportService {

    constructor(private http: HttpClient) { }
    public getReportData(inputData): Promise<any> {
        return this.http.post('url', JSON.stringify(inputData), httpOptions)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }
    public extractData(res: Response) {
        let body = res;
        return body || {};
    }
    public handleErrorPromise(error: any): Promise<any> {

        return Promise.reject(error);
    }

}