import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';
import { StocksService } from '../../stocks.service';

@Injectable({
  providedIn: 'root'
})
export class AddStockService {

  constructor(
    private localStorageService: LocalStorageService,
    private stocksService: StocksService
    ) { }

  addStock(stockInput: string): void{
    // update stocks array
    let stocks:string[] = this.localStorageService.getStocks();
    stocks.push(stockInput);

    // update local storage
    this.localStorageService.saveStocks(stocks);

    this.stocksService.loading$.next(true);
    // update behaviorsubject with response for new stock which updates view for single item added
    this.stocksService.getQuote(stockInput).subscribe({
      next: result => {
        this.stocksService.quotes.push(result);
        this.stocksService.allQuotes$.next(this.stocksService.quotes);
      },
      error: err => console.log(err),
      complete: () => this.stocksService.loading$.next(false)
  });
  }
}
