import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddStockService } from './add-stock.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  stockInput: string = "";

  addStockForm = new FormGroup({
    stockInput: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]*")])
  })

  constructor(private addStockService: AddStockService) { }

  ngOnInit(): void {
  }

  addStock(): void{
    this.addStockService.addStock(this.stockInput);
    this.addStockForm.reset();
  }

  checkError(controlName: string, errorName: string): boolean{
    const control:AbstractControl = this.addStockForm.controls[controlName];
    return control.hasError(errorName) && (control.dirty || control.touched);
  }

}
