import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getStocks(): string[]{
    let stocks:string[] = [];
    let storedValue = localStorage.getItem('stocks');
    if(storedValue){
      try{
        stocks = JSON.parse(storedValue);
      }catch{
        throwError(() => new Error('Error reading from local storage'));
      }
    }
    return stocks;
  }

  saveStocks(stocks: string[]): void{
    try{
      localStorage.setItem('stocks', JSON.stringify(stocks));
    }catch{
      throwError(() => new Error('Error saving to local storage'));
    }
  }
}
