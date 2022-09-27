import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
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
      this.getAllQuotes().subscribe(quotes => {
        this.allQuotes$.next(quotes);
        this.quotes = quotes;
      });
     }

  getQuote(stock: string): Observable<StockQuote> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let httpOptions = {headers: headers};
    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${stock}&token=${this.apiKey}`;
    const nameUrl = `https://finnhub.io/api/v1/search?q=${stock}&token=${this.apiKey}`;

    let quoteData$ = this.http.get<QuoteInfo>(quoteUrl,httpOptions);
    let companyName$ = this.http.get<{'count': number, 'result': CompanyInfo[]}>(nameUrl,httpOptions)
      .pipe(
        map(x => x.result[0])
        //.find(({displaySymbol}) => displaySymbol === stock)) - returns CompanyInfo | undefined - so we assume we can use first array element in return instead
      );

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

  getAllQuotes(): Observable<StockQuote[]> {
    const stocks: string[] = this.localStorageService.getStocks();
    let requests: Observable<StockQuote>[] = [];
    stocks.forEach(stock => requests.push(this.getQuote(stock)));
    return combineLatest(requests);
  }
}
