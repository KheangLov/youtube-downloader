import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { debounceTime, filter, map, mergeMap } from 'rxjs/operators';
import { finalize, of, Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { CARD_VIEW, DEFAULT_SEARCH, FILE_TYPE, FILTER, FILTER_TYPE, IFile, IFilter, IVideo, IView, LIST_VIEW, MP3, MP4 } from '../helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {
  ctrl: FormControl = new FormControl('');
  videoList: Array<IVideo> = [];
  viewType: IView = LIST_VIEW;
  file: IFile = MP3;
  isSearch = false;
  isEmptyVideo = false;
  isEntered!: boolean;
  isLoading!: boolean;
  filterTypes: Array<IFilter> = FILTER;
  selected: FILTER_TYPE = FILTER_TYPE.NORMAL;

  private _tempVideo: Array<IVideo> = [];

  protected _onDestroy$: Subject<void> = new Subject<void>();

  constructor(private readonly _apiService: ApiService) {
    this.isLoading = true;
    this._getVideoList(DEFAULT_SEARCH);
    this._subscribeSearchValue();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  switchView() {
    this.viewType = this.viewType.type === LIST_VIEW.type ? CARD_VIEW : LIST_VIEW;
  }

  enter() {
    const { value } = this.ctrl;

    this._getVideoList(value);
    this.isEntered = true;
  }

  changeFileType(type: string) {
    this.file = type === FILE_TYPE.MP3 ? MP4 : MP3;
    this.videoList = _.map(this.videoList, v => ({
      ...v,
      downloadLink: `${environment.apiUrl}/${this.file.type}?url=${v.url}`
    }));
  }

  filterData(filter: IFilter) {
    this.selected = filter.value;

    if (filter.value === FILTER_TYPE.NORMAL) {
      this.videoList = [...this._tempVideo];
    } else {
      this.videoList = _.orderBy(this.videoList, filter.field, filter.direction);
    }
  }

  isSelected(value: FILTER_TYPE): boolean {
    return value === this.selected;
  }

  trackById(_: any, { id }: IVideo): string {
    return id;
  }

  private _getVideoList(search: string) {
    const _search = search || DEFAULT_SEARCH;

    this.isEntered = false;
    this._apiService.getVideoList(_search)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((videos: Array<IVideo>) => {
        this.videoList = videos;
        this._tempVideo = videos;
      });

    return of();
  }

  private _subscribeSearchValue() {
    this.ctrl.valueChanges
      .pipe(
        debounceTime(3000),
        filter(() => !this.isEntered),      
        map(this._afterInputValueChanged.bind(this)),
        mergeMap(this._getVideoList.bind(this)),
        takeUntil(this._onDestroy$),
      )
      .subscribe();
  }

  private _afterInputValueChanged(value: string) {
    this.isLoading = true;
    this.videoList = [];
    return value;
  }
}
