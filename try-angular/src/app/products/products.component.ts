import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
    .subscribe(products => this.products = products);
  }

  add(
    id: any,
    name: string,
    category: string,
    manufacturer: any,
    description: string,
    price: string,
  ): void {
    name = name.trim();
    description = description.trim();
    if (!name && !category && !manufacturer && !price) { return; }
    var product = {
      "id": id as number,
      "category": JSON.parse(category),
      "manufacturer": manufacturer as number,
      "name": name,
      "description": description,
      "price": price
    }
    console.log(product)
    this.productService.addProduct(product)
      .subscribe(product => {
        this.products.push(product);
      });
  }
}
