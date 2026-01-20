import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoreService } from './services/store.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-17-standalone-example';
  constructor(private _storeService: StoreService) {
    this._storeService.initRetriveStoreData();

  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
  }
}
