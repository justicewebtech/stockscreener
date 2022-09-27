import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddStockService {

  constructor(private localStorageService: LocalStorageService) { }

  addStock(stockInput: string): void{
    let stocks:string[] = this.localStorageService.getStocks();
    stocks.push(stockInput);
    this.localStorageService.saveStocks(stocks);
  }
}
