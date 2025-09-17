import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CryptoPriceChartComponent } from './components/crypto-price-chart/crypto-price-chart.component';
import { CryptoOptionsComponent } from './components/crypto-options/crypto-options.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CryptoPriceChartComponent, CryptoOptionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
