import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStockComponent } from './stock-screener/add-stock/add-stock.component';
import { StockInfoComponent } from './stock-screener/stock-info/stock-info.component';
import { StockSentimentComponent } from './stock-sentiment/stock-sentiment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StockScreenerComponent } from './stock-screener/stock-screener.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStockComponent,
    StockInfoComponent,
    StockSentimentComponent,
    StockScreenerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
