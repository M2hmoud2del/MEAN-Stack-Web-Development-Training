import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: IProduct;
  @Output() productPurchased = new EventEmitter<IProduct>();

  buy(): void {
    this.productPurchased.emit(this.product);
  }
}
