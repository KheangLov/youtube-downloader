import { Component } from '@angular/core';
import { ViewComponent } from '../view';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent extends ViewComponent {
  get isAddEndBorder(): boolean {
    if (window.innerWidth > 991) {
      return this.index % 4 > 0;
    }

    return this.index % 2 === 1;
  }
}
