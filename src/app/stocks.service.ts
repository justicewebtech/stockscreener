import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { CompanyInfo, QuoteInfo, StockQuote } from './models';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  apiKey:string = "bu4f8kn48v6uehqi3cqg";

  allQuotes$ = new BehaviorSubject<StockQuote[]>([]);
  quotes:StockQuote[] = [];

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
    ) {

      this.allQuotes$.subscribe(quotes => this.quotes = quotes);
      this.getAllQuotes().subscribe(quotes => this.allQuotes$.next(quotes));

     }

  getQuote(stock: string): Observable<StockQuote> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let httpOptions = {headers: headers};
    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${stock}&token=${this.apiKey}`;
    const nameUrl = `https://finnhub.io/api/v1/search?q=${stock}&token=${this.apiKey}`;

    let quoteData$ = this.http.get<QuoteInfo>(quoteUrl,httpOptions);
    let companyName$ = this.getCompanyInfo(stock);

    return combineLatest([companyName$, quoteData$])
      .pipe(
        map(([companyName, quoteData]) => {
          let returnQuote: StockQuote = {
            company: companyName,
            quote: quoteData
          }
          return returnQuote;
        })
      );
  }

  getCompanyInfo(stock: string): Observable<CompanyInfo>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let httpOptions = {headers: headers};
    const nameUrl = `https://finnhub.io/api/v1/search?q=${stock}&token=${this.apiKey}`;

    return this.http.get<{'count': number, 'result': CompanyInfo[]}>(nameUrl,httpOptions)
      .pipe(
        map(x => x.result[0])
        //.find(({displaySymbol}) => displaySymbol === stock)) - returns CompanyInfo | undefined - so we assume we can use first array element in return instead
      );

  }

  getAllQuotes(): Observable<StockQuote[]> {
    const stocks: string[] = this.localStorageService.getStocks();
    let requests: Observable<StockQuote>[] = [];
    stocks.forEach(stock => requests.push(this.getQuote(stock)));
    return combineLatest(requests);
  }

  getSentiment(symbol: string): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let httpOptions = {headers: headers};
    let current = new Date();
    let previous = new Date();
    previous.setMonth(previous.getMonth() - 2);

    let currentDateString = current.toISOString().split('T')[0];
    let previousDateString = previous.toISOString().split('T')[0];

    const url = `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${symbol}&from=${previousDateString}&to=${currentDateString}&token=${this.apiKey}`;
    return this.http.get<any>(url,httpOptions);
  }
}
