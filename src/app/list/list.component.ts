import { Component } from '@angular/core';
import * as _ from 'lodash';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  videoList: Array<any> = [];
  isEmptyVideo = false;
  isLoading!: boolean;
  searchText!: string;

  constructor(private readonly _apiService: ApiService) {
    this.searchText = this._getSearch();
    this.isLoading = true;    
    this._getVideoList();
  }

  getFormattedView(view: number): string {
    return new Intl.NumberFormat("en-GB", {
      notation: "compact",
      compactDisplay: "short",
    }).format(view);
  }

  getUrl(url: string, type: string): string {
    return `${environment.apiUrl}/${type}?url=${url}`;
  }

  private _getSearch(): string {
    return this._apiService.getSearch();
  }

  private _getVideoList() {
    this._apiService.getVideoList()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(({ videos }: any) => this.videoList = videos);
  }
}
