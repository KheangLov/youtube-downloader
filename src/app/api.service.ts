import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from 'lodash';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { FILE_TYPE, getFormattedView, IVideo } from "./helper";

const httpHeaders = new HttpHeaders({
  'Accept': '*/*',
  'rejectUnauthorized': 'false',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  'Access-Control-Allow-Headers': 'X-CSRF-Token, Authorization, Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
});

@Injectable()
export class ApiService {
  private readonly _apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  getVideoList(search: string): Observable<Array<IVideo>> {
    return this._http.get<Array<IVideo>>(`${this._apiUrl}/list?search=${search}`)
      .pipe(map(this._onVideoListResponse.bind(this)));
  }

  download({ id, type }: IVideo): Observable<any> {
    return this._http.get<Blob>(
      `${this._apiUrl}/${type}?videoId=${id}`,
      {
        observe: 'response',
        responseType: 'blob' as 'json',
        headers: httpHeaders
      }
    ).pipe(map(this._getDownload.bind(this)));
  }

  private _getDownload(response: HttpResponse<Blob>) {
    const _filename = this._getFileName(response);

    const _binaryData = [] as Array<Blob>;
    _binaryData.push(response.body as Blob);

    const _downloadLink = document.createElement('a');

    _downloadLink.href = window.URL.createObjectURL(new Blob(_binaryData, { type: 'blob' }));
    _downloadLink.setAttribute('download', _filename);
    document.body.appendChild(_downloadLink);
    _downloadLink.click();

    return false;
  }

  private _getFileName(response: HttpResponse<Blob>): string {
    const _cd = response.headers.get('content-disposition');
    const _filename = _.last(_.split(_cd, 'filename=')) as string;

    return decodeURI(_filename);
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
        type: FILE_TYPE.MP3,
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
