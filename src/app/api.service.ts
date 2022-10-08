import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from 'lodash';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { FILE_TYPE, getFormattedView, IVideo } from "./helper";

@Injectable()
export class ApiService {
  private readonly _apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  getVideoList(search: string): Observable<Array<IVideo>> {
    return this._http.get<Array<IVideo>>(`${this._apiUrl}/list?search=${search}`)
      .pipe(map(this._onVideoListResponse.bind(this)));
  }

  private _onVideoListResponse({ videos }: any): Array<IVideo> {
    const _videos: Array<IVideo> = _.map(
      videos, 
      ({ id, title, url, views, snippet, duration_raw }: any) => ({
        id: id.videoId,
        title,
        url,
        duration: duration_raw,
        durationRaw: this._getDurationRaw(duration_raw),
        viewsRaw: _.toInteger(views),
        views: getFormattedView(views),
        image: snippet.thumbnails.url,
        publishedAt: snippet.publishedAt,
        downloadLink: `${environment.apiUrl}/${FILE_TYPE.MP3}?url=${url}`
      })
    );

    return _.take(_videos, 16);
  }

  private _getDurationRaw(duration: string): number {
    const dur = _.reverse(_.split(duration, ':'));

    return _.reduce(dur, (sum: number, n: string, index: number) => {
      const _n = !_.isEmpty(n) ? _.toInteger(n) : 0;
      let num = _n;

      if (index === 1) {
        num *= 60;
      } else if (index === 2) {
        num *= 3600;
      }

      return sum + num;
    }, 0);
  }
}