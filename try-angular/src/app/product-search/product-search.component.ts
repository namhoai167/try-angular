import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  products$!: Observable<Product[]>;
  private searchTerms = new Subject<string>();

  constructor(private productService: ProductService) {}

  // Push a search term into the observable stream.
  search(category:string, manufacturer: string): void {
    const searchTerms: any = {
      "category": category,
      "manufacturer": manufacturer
    }
    this.searchTerms.next(searchTerms);
  }

  ngOnInit(): void {
    this.products$ = this.searchTerms.pipe(
      // wait 500ms after each keystroke before considering the term
      // debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((obj: Object) => this.productService.searchProducts(obj)),
    );
  }
}