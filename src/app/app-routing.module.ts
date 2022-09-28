import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockScreenerComponent } from './stock-screener/stock-screener.component';
import { StockSentimentComponent } from './stock-sentiment/stock-sentiment.component'

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: StockScreenerComponent},
  {path: 'sentiment/:symbol', component: StockSentimentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
