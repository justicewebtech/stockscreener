import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StockQuote } from '../models';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.css']
})
export class StockInfoComponent implements OnInit {

  allQuotes$: Observable<StockQuote[]> = of([]);

  constructor(private stocksService:StocksService) { }

  ngOnInit(): void {
    this.allQuotes$ = this.stocksService.getAllQuotes();
  }

}
