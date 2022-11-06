import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DEFAULT_VIDEO, IVideo } from "../helper";
import { ApiService } from './../api.service';

@Component({
  template: '',
})
export class ViewComponent {
  video: IVideo = DEFAULT_VIDEO;
  index!: number;
  loading = false;

  constructor(
    private readonly _apiService: ApiService,
    private readonly _snackBar: MatSnackBar
  ) {}

  download(video: IVideo) {
    this.loading = true;
    this._apiService.download(video)
      .subscribe(() => {
        this.loading = false;
        this._snackBar.open('Download completed!', 'Close', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          duration: 5000
        });
      });
  }
}
