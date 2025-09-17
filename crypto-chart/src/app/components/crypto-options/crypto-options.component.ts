import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CryptoPriceService } from '../../services/crypto-price.service';

@Component({
  selector: 'app-crypto-options',
  imports: [CommonModule, FormsModule],
  templateUrl: './crypto-options.component.html',
  styleUrl: './crypto-options.component.scss',
})
export class CryptoOptionsComponent implements OnInit {
  coin: string = '';
  currency: string = '';
  days: string = '';

  coinOptions: string[] = [
    'bitcoin',

    'ethereum',

    'litecoin',

    'dogecoin',

    'cardano',

    'binancecoin',

    'solana',

    'polkadot',

    'ripple',

    'dogecoin',

    'uniswap',

    'chainlink',

    'shiba-inu',

    'avalanche',

    'tron',
  ];

  currencyOptions: string[] = [
    'usd',

    'eur',

    'gbp',

    'jpy',

    'aud',

    'cad',

    'chf',

    'cny',

    'inr',

    'brl',
  ];

  daysOptions: string[] = ['7', '14', '30', '90', '180', '365'];

  constructor(private cryptoPriceService: CryptoPriceService) {}

  ngOnInit(): void {
    this.coin = this.cryptoPriceService.coin;
    this.currency = this.cryptoPriceService.currency;
    this.days = this.cryptoPriceService.days;
  }

  onSubmit(): void {
    this.cryptoPriceService.updateCryptoOptions(
      this.coin,
      this.currency,
      this.days
    );
  }
}
