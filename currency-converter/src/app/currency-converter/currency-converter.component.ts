import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyConverterService } from '../services/currency-converter.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';

interface CurrencyMeta {
  code: string;
  name: string;
  symbol: string;
  countryCode: string;
  flag: string;
}

@Component({
  selector: 'app-currency-converter',
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent {
  sourceCurrency: string = 'USD';
  targetCurrency: string = 'VND';
  amount: number = 1;
  conversionRate: number | null = null;
  currencies: string[] = [];
  currencyFlags: { [key: string]: string } = {};
  result: number = 0;

  private readonly CURRENCY_CATALOG: Record<
    string,
    Omit<CurrencyMeta, 'flag'>
  > = {
    USD: { code: 'USD', name: 'US Dollar', symbol: '$', countryCode: 'US' },
    EUR: { code: 'EUR', name: 'Euro', symbol: '€', countryCode: 'EU' },
    GBP: {
      code: 'GBP',
      name: 'Pound Sterling',
      symbol: '£',
      countryCode: 'GB',
    },
    JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', countryCode: 'JP' },
    INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', countryCode: 'IN' },
    VND: {
      code: 'VND',
      name: 'Vietnamese Đồng',
      symbol: '₫',
      countryCode: 'VN',
    },
    CNY: { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', countryCode: 'CN' },
    HKD: {
      code: 'HKD',
      name: 'Hong Kong Dollar',
      symbol: '$',
      countryCode: 'HK',
    },
    KRW: {
      code: 'KRW',
      name: 'South Korean Won',
      symbol: '₩',
      countryCode: 'KR',
    },
    SGD: {
      code: 'SGD',
      name: 'Singapore Dollar',
      symbol: '$',
      countryCode: 'SG',
    },
    THB: { code: 'THB', name: 'Thai Baht', symbol: '฿', countryCode: 'TH' },
    MYR: {
      code: 'MYR',
      name: 'Malaysian Ringgit',
      symbol: 'RM',
      countryCode: 'MY',
    },
    IDR: {
      code: 'IDR',
      name: 'Indonesian Rupiah',
      symbol: 'Rp',
      countryCode: 'ID',
    },
    PHP: {
      code: 'PHP',
      name: 'Philippine Peso',
      symbol: '₱',
      countryCode: 'PH',
    },
    AUD: {
      code: 'AUD',
      name: 'Australian Dollar',
      symbol: '$',
      countryCode: 'AU',
    },
    NZD: {
      code: 'NZD',
      name: 'New Zealand Dollar',
      symbol: '$',
      countryCode: 'NZ',
    },
    CAD: {
      code: 'CAD',
      name: 'Canadian Dollar',
      symbol: '$',
      countryCode: 'CA',
    },
    CHF: { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', countryCode: 'CH' },
    SEK: {
      code: 'SEK',
      name: 'Swedish Krona',
      symbol: 'kr',
      countryCode: 'SE',
    },
    NOK: {
      code: 'NOK',
      name: 'Norwegian Krone',
      symbol: 'kr',
      countryCode: 'NO',
    },
    DKK: { code: 'DKK', name: 'Danish Krone', symbol: 'kr', countryCode: 'DK' },
    BRL: {
      code: 'BRL',
      name: 'Brazilian Real',
      symbol: 'R$',
      countryCode: 'BR',
    },
    MXN: { code: 'MXN', name: 'Mexican Peso', symbol: '$', countryCode: 'MX' },
    ZAR: {
      code: 'ZAR',
      name: 'South African Rand',
      symbol: 'R',
      countryCode: 'ZA',
    },
    TRY: { code: 'TRY', name: 'Turkish Lira', symbol: '₺', countryCode: 'TR' },
    AED: { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', countryCode: 'AE' },
    SAR: { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', countryCode: 'SA' },
    KWD: {
      code: 'KWD',
      name: 'Kuwaiti Dinar',
      symbol: 'د.ك',
      countryCode: 'KW',
    },
    RUB: { code: 'RUB', name: 'Russian Ruble', symbol: '₽', countryCode: 'RU' },
  };

  constructor(private currencyConverterService: CurrencyConverterService) {}

  ngOnInit() {
    const metadataCurrencies = this.listAllCurrencyMeta();
    this.currencies = metadataCurrencies.map((curr) => curr.code);
    this.currencyFlags = metadataCurrencies.reduce((acc, curr) => {
      acc[curr.code] = curr.flag;
      return acc;
    }, {} as { [key: string]: string });
    this.updateConversionRate();
  }

  updateConversionRate() {
    // Nếu cùng loại tiền, xử lý đồng bộ luôn cho mượt
    if (this.sourceCurrency === this.targetCurrency) {
      this.conversionRate = 1;
      this.result = this.amount ?? 0;
      return;
    }

    this.currencyConverterService
      .getRate(this.sourceCurrency, this.targetCurrency)
      .pipe(
        tap((rate) => {
          this.conversionRate = rate;
          console.log('Rate:', rate);
        }),
        switchMap(() =>
          this.currencyConverterService.convert(
            this.sourceCurrency,
            this.targetCurrency,
            this.amount
          )
        )
      )
      .subscribe((result) => {
        this.result = result;
        console.log('Converted:', result);
      });
  }
  convertCurrency() {
    this.updateConversionRate();
  }

  private getFlagEmoji(countryCode: string): string {
    return countryCode
      .toUpperCase()
      .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
  }

  private listAllCurrencyMeta(): CurrencyMeta[] {
    return Object.values(this.CURRENCY_CATALOG).map((raw) => ({
      ...raw,
      flag: this.getFlagEmoji(raw.countryCode),
    }));
  }

  getFlagAndCurrency(currency: string): string {
    return `${this.currencyFlags[currency] || ''} - ${currency}`;
  }
}
