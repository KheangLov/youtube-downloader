import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from 'lodash';
import { environment } from "src/environments/environment";

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const API_KEY = 'c1lnxqbe5qFvPUK1fH9jFQjEKdmFZQh2ShfF8P02riUU1dq';

@Injectable()
export class ApiService {
  private readonly _apiUrl = environment.apiUrl;
  private readonly _apiKeepSaveIt = environment.apiKeepSaveIt;

  constructor(private readonly _http: HttpClient) {}

  getVideoList() {
    const _search = this.getSearch();
    return this._http.get(`${this._apiUrl}/list?search=${_search}`);
  }

  getKeepIt(url: string) {
    return this._http.get(`${this._apiKeepSaveIt}?api_key=${API_KEY}&url=${url}`);
  }

  postKeepIt(url: string) {
    return this._http.post(`${this._apiKeepSaveIt}`, { api_key: API_KEY, url }, httpHeaders);
  }
  
  getSearch(): string {
    return window.localStorage.getItem('search') as string;
  }

  setSearch(search: string) {
    window.localStorage.setItem('search', search);
  }
}