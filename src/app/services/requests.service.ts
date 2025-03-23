import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBooks } from '../interfaces/books.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private _http = inject(HttpClient);

  constructor() { }

  get(search: string): Observable<IBooks> {
    return this._http.get<IBooks>(`https://openlibrary.org/search.json?limit=50&title=${search}`);
  }
}
