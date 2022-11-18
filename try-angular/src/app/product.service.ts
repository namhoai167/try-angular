import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Product } from './product';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private productsUrl = 'http://127.0.0.1:8000/api/products/'

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getProducts(): Observable<Product[]> {
    const products = of([]);
    this.messageService.add('ProductService: fetched products');
    return products;
  }

  getProduct(id: number): Observable<Product> {

    this.messageService.add(`ProductService: fetched product id=${id}`);
    return of();
  }
}
