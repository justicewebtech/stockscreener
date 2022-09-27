import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StockQuote } from '../models';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent implements OnInit {

  allQuotes$ = new BehaviorSubject<StockQuote[]>([]);
  // quotes: StockQuote[] = [];

  constructor(private stocksService:StocksService) {
    // this.quotes = this.stocksService.quotes;
  }

  ngOnInit(): void {
    this.allQuotes$ = this.stocksService.allQuotes$;
  }

}
