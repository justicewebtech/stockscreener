import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, mergeMap, Observable, of } from 'rxjs';
import { StockQuote } from '../models';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-stock-sentiment',
  templateUrl: './stock-sentiment.component.html',
  styleUrls: ['./stock-sentiment.component.css']
})
export class StockSentimentComponent implements OnInit {

  sentiment$: Observable<any> = of();
  defaultQuote: StockQuote = {
    company:{
      description: "",
      displaySymbol: "",
      symbol: "",
      type: ""
    },
    quote:{
      "c": 0,
      "d": 0,
      "dp": 0,
      "h": 0,
      "l": 0,
      "o": 0,
      "pc": 0,
      "t": 0,
    }
  };
  quote: StockQuote = Object.assign(this.defaultQuote);

  constructor(
    private stocksService: StocksService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    //TODO: Finish implementing this logic to display information in sentiment component
    this.route.paramMap
      .pipe(
        mergeMap((params: ParamMap) => {
          let symbol = params.get('symbol') ?? "";
          let sentiment$ = this.stocksService.getSentiment(symbol);
          let companyInfo$ = this.stocksService.getCompanyInfo(symbol);
          return combineLatest([companyInfo$, sentiment$]);
        })
      ).subscribe(x => console.log(x))

  }

}
