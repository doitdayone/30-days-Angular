import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

type ErApiResponse = {
  result: 'success' | 'error';
  base_code: string; // ví dụ: "USD"
  time_last_update_utc?: string; // thời gian cập nhật
  time_next_update_utc?: string;
  rates?: Record<string, number>; // ví dụ: { "EUR": 0.92, "VND": 25340.5, ... }
  error_type?: string;
};

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  private api = 'https://open.er-api.com/v6/latest';

  constructor(private http: HttpClient) {}

  /** Lấy toàn bộ rates của 1 đồng (base) */
  getAllRates(base: string): Observable<ErApiResponse> {
    const url = `${this.api}/${base.toUpperCase()}`;
    return this.http.get<ErApiResponse>(url);
  }

  /** Lấy tỷ giá from -> to */
  getRate(from: string, to: string): Observable<number> {
    return this.getAllRates(from).pipe(
      map((res) => {
        if (res.result !== 'success' || !res.rates) {
          throw new Error(res.error_type || 'Failed to fetch rates');
        }
        const rate = res.rates[to.toUpperCase()];
        if (typeof rate !== 'number') {
          throw new Error(
            `Rate ${from.toUpperCase()}→${to.toUpperCase()} not found`
          );
        }
        return rate;
      })
    );
  }

  /** Quy đổi số tiền from -> to */
  convert(from: string, to: string, amount: number): Observable<number> {
    return this.getRate(from, to).pipe(map((rate) => amount * rate));
  }
}
