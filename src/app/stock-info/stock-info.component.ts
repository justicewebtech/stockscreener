import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { StockQuote } from '../models';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent implements OnInit {

  allQuotes$ = new BehaviorSubject<StockQuote[]>([]);

  constructor(
    private stocksService:StocksService,
    private localStorageService: LocalStorageService
    ) { }

  ngOnInit(): void {
    this.allQuotes$ = this.stocksService.allQuotes$;
  }

  deleteItem(symbol:string): void{

    // deep copy
    let quotes: StockQuote[] = JSON.parse(JSON.stringify(this.stocksService.quotes));

    // find and delete item
    const quoteIdx = quotes.findIndex(quote => quote.company.symbol.toLocaleLowerCase() === symbol.toLocaleLowerCase());
    quotes.splice(quoteIdx,1);

    // update local storage - array of stock symbols (string[])
    this.localStorageService.saveStocks(quotes.map(quote => quote.company.symbol));

    // update behavior subject - StockQuote[]
    this.stocksService.allQuotes$.next(quotes);
  }

  sentiment(symbol: string): void {

  }

}
