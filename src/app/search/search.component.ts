import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  ctrl: FormControl = new FormControl('', Validators.required);

  get isValid(): boolean {
    return !_.isEmpty(this.ctrl.value) && this.ctrl.valid;
  }

  get errorMessage(): string {
    if (this.ctrl.hasError('required')) {
      return 'Please input any value!';
    }

    if (this.ctrl.invalid) {
      return 'Please input a valid value!';
    }

    return '';
  }
  
  constructor(
    private readonly _apiService: ApiService,
    private readonly _router: Router
  ) {}

  search() {
    this._apiService.setSearch(this.ctrl.value);
    this._router.navigate(['/list']);
  }
}
