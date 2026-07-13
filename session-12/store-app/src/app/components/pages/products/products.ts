import { Component } from '@angular/core';
import { Store } from '../../../models/store';
import { IProduct } from '../../../models/iproduct';
import { ICategory } from '../../../models/icategory';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../../product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  store: Store = new Store(
    'Tech Store',
    ['Cairo branch', 'Giza branch', 'Alexandria branch'],
    'https://static.vecteezy.com/system/resources/thumbnails/020/662/330/small_2x/store-icon-logo-illustration-vector.jpg',
  );
  ClientName: string = 'Mahmoud Adel';
  ProductList: IProduct[] = [];
  CategoryList: ICategory[] = [
    { ID: 1, Name: 'Laptops' },
    { ID: 2, Name: 'Phones' },
    { ID: 3, Name: 'Accessories' },
  ];
  selectedCategoryID = 0;
  searchTerm = '';
  IsPurchased = false;

  constructor() {
    const image = 'https://static.vecteezy.com/system/resources/thumbnails/020/662/330/small_2x/store-icon-logo-illustration-vector.jpg';
    this.ProductList = [
      { id: 1, name: 'Pro Laptop', quantity: 10, price: 50000, img: image, categoryID: 1 },
      { id: 2, name: 'Student Laptop', quantity: 2, price: 25000, img: image, categoryID: 1 },
      { id: 3, name: 'Smart Phone', quantity: 1, price: 18000, img: image, categoryID: 2 },
      { id: 4, name: 'Budget Phone', quantity: 0, price: 9000, img: image, categoryID: 2 },
      { id: 5, name: 'Wireless Mouse', quantity: 8, price: 700, img: image, categoryID: 3 },
      { id: 6, name: 'USB-C Cable', quantity: 3, price: 250, img: image, categoryID: 3 },
    ];
  }

  get filteredProducts(): IProduct[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.ProductList.filter((product) =>
      (this.selectedCategoryID === 0 || product.categoryID === this.selectedCategoryID) &&
      product.name.toLowerCase().includes(term),
    );
  }

  confirmClient(): void {
    this.IsPurchased = true;
  }

  buyProduct(product: IProduct): void {
    if (product.quantity > 0) {
      product.quantity--;
    }
  }
}
