import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Library } from '../interfaces/library.interface';
import { MOCK_LIBRARIES } from '../mock/mock-libray';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private _http = inject(HttpClient);

  constructor() { }

  get() {
    return this._http.get('https://data.mos.ru/opendata/526?isRecommendationData=false&pageIndex=0&pageSize=10');
  }

  getMock(): Observable<Library[]> {
    return of(MOCK_LIBRARIES);
  }
}
