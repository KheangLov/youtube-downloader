import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

const reg = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  ctrl: FormControl = new FormControl('', [Validators.required, Validators.pattern(reg)]);
  link!: string;

  protected _onDestroy$: Subject<void> = new Subject<void>();

  get isValidLink(): boolean {
    return !_.isEmpty(this.ctrl.value) && this.ctrl.valid;
  }
  
  constructor() {
    this._subscribeValueChange();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  private _subscribeValueChange() {
    this.ctrl.valueChanges
      .pipe(
        filter(value => !_.isEmpty(value)),
        takeUntil(this._onDestroy$)
      )
      .subscribe(value => this.link = `https://calm-tor-71357.herokuapp.com/mp3?url=${value}`);
  }
}
