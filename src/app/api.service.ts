import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from 'lodash';
import { environment } from "src/environments/environment";

@Injectable()
export class ApiService {
  private readonly _apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  getVideoList() {
    const _search = this.getSearch();
    return this._http.get(`${this._apiUrl}/list?search=${_search}`);
  }
  
  getSearch(): string {
    return window.localStorage.getItem('search') as string;
  }

  setSearch(search: string) {
    window.localStorage.setItem('search', search);
  }
}