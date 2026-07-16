import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/core/navbar/navbar';
import { Footer } from './components/core/footer/footer';
import { Products } from './components/pages/products/products';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, Products],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('store-app');
}
