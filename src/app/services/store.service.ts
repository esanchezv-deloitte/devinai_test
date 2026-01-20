import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';
import { Subject, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { StorageService } from './storage.service';
import { retrieveUser } from '../state/user.action';

@Injectable({ providedIn: 'root' })
export class StoreService {
  destroyed$: Subject<boolean> = new Subject();

  constructor(
    private _store: Store,
    @Inject(PLATFORM_ID) private platformId: object,
    private _cookieService: CookieService,
    private _storageService: StorageService,
    private _actionsSubj: ActionsSubject,
  ) {
  }

  public initRetriveStoreData() {
    this.storeExistingUser();
    this._actionsSubj
      .pipe(
        takeUntil(this.destroyed$),
        switchMap(() => this._store),
        distinctUntilChanged(),
      )
      .subscribe((value: any) => {
        // console.log(value);
        if (value.user) this._storageService.setItem('local', 'user-data-store', JSON.stringify(value.user.data));
      });
  }

  private storeExistingUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user-data-store');
      const userToken = this._cookieService.get('X-Auth-Token');
      if (!userData && !userToken) return;
      const payload: any = {
        isLoggedIn: false,
        data: userData ? JSON.parse(userData) : null,
        token: userToken ? userToken : null,
      };
      if (payload.token && payload.data) payload.isLoggedIn = true;
      this._store.dispatch(retrieveUser({ payload: payload }));
    }
  }
}
