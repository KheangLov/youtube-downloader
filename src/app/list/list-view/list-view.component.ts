import { Component } from '@angular/core';
import { ViewComponent } from '../view';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent extends ViewComponent {
  get imageBackground() {
    return { backgroundImage: `url(${this.video.image})` };
  }

  get isAddEndBorder(): boolean {
    return this.index % 2 === 1;
  }
}
