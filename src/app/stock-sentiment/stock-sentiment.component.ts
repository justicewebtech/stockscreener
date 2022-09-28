import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, map, mergeMap, Observable, shareReplay } from 'rxjs';
import { CompanySentiment } from '../models';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-stock-sentiment',
  templateUrl: './stock-sentiment.component.html',
  styleUrls: ['./stock-sentiment.component.css']
})
export class StockSentimentComponent implements OnInit {

  sentiment$: Observable<CompanySentiment>;

  constructor(
    private stocksService: StocksService,
    private route: ActivatedRoute) {
      this.sentiment$ = this.route.paramMap
      .pipe(
        mergeMap((params: ParamMap) => {
          let symbol = params.get('symbol') ?? "";
          let sentiment$ = this.stocksService.getSentiment(symbol);
          let companyInfo$ = this.stocksService.getCompanyInfo(symbol);
          return combineLatest([companyInfo$, sentiment$]);
        }),
        map(results => {
          return {company: results[0], sentiment: results[1]}
        }),
        shareReplay(1)
      )
     }

  ngOnInit(): void { }

  toMonthName(monthNumber: number): string {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }

}
