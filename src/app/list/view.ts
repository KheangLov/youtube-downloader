import { Component } from "@angular/core";
import { DEFAULT_VIDEO, IVideo } from "../helper";

@Component({
  template: '',
})
export class ViewComponent {
  video: IVideo = DEFAULT_VIDEO;
  index!: number;
}