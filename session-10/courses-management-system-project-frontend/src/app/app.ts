import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Navigation } from './navigation/navigation';
import { Side } from './side/side';
import { Main } from './main/main';
import { Footer } from './footer/footer';
import { FormsModule } from '@angular/forms';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,NgClass,NgStyle,CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
    products = [
      {
        id: 1,
        name: 'Product 1',
        category: 'Category 1',
        price: 10.99,
        stock: 5,
        status: 'new',
      },
      {
        id: 2,
        name: 'Product 2',
        category: 'Category 2',
        price: 15.99,
        stock: 10,
        status: 'sale',
      },
      {
        id: 3,
        name: 'Product 3',
        category: 'Category 1',
        price: 20.99,
        stock: 15,
        status: 'new',
      },
      {
        id: 4,
        name: 'Product 4',
        category: 'Category 3',
        price: 25.99,
        stock: 20,
        status: 'sale',
      }
    ];
    isAdmin = false;

}
