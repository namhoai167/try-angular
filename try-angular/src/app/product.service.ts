import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private productsUrl = 'http://127.0.0.1:8000/api/products/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Log a ProductService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET products from the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  /** GET product by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  /** PUT: update the product on the server */
  updateProduct(id: number, product: Product): Observable<any> {
    const url = `${this.productsUrl}${id}`;
    return this.http.put(url, product, this.httpOptions).pipe(
      tap(_ => this.log(`updated product id=${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  /** POST: add a new product to the server */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions).pipe(
      tap((newProduct: Product) => this.log(`added product w/ id=${newProduct.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  /** DELETE: delete the product from the server */
  deleteProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }
}
