import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from './auth.service';
import { addUser, clearUser } from '../state/user.action';

describe('AuthService', () => {
  let service: AuthService;
  let mockCookieService: jasmine.SpyObj<CookieService>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLocation: jasmine.SpyObj<Location>;
  let storeSubject: BehaviorSubject<any>;

  const initialStoreState = {
    isLoggedIn: false,
    token: null,
    data: null
  };

  beforeEach(() => {
    storeSubject = new BehaviorSubject<any>(initialStoreState);

    mockCookieService = jasmine.createSpyObj('CookieService', ['set', 'delete']);
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockLocation = jasmine.createSpyObj('Location', ['replaceState']);

    mockStore.select.and.returnValue(storeSubject.asObservable());

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: CookieService, useValue: mockCookieService },
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  describe('TC-001: Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('TC-002: Constructor - Store Subscription', () => {
    it('should subscribe to store and update properties when store emits new values', () => {
      const newState = {
        isLoggedIn: true,
        token: 'test-token-123',
        data: { username: 'testUser', email: 'test@example.com' }
      };

      storeSubject.next(newState);

      expect(service.isLoggedIn).toBe(true);
      expect(service.userToken).toBe('test-token-123');
      expect(service.userData).toEqual({ username: 'testUser', email: 'test@example.com' });
    });
  });

  describe('setLoginData', () => {
    describe('TC-003: Dispatch addUser action with valid data', () => {
      it('should dispatch addUser action with correct payload when valid data is provided', () => {
        const loginData = {
          token: 'valid-token-abc',
          username: 'Eduardo',
          email: 'eduardo@test.com'
        };

        service.setLoginData(loginData);

        expect(mockStore.dispatch).toHaveBeenCalledWith(
          addUser({
            payload: {
              data: loginData,
              token: 'valid-token-abc',
              isLoggedIn: true
            }
          })
        );
      });
    });

    describe('TC-004: Set cookie with token', () => {
      it('should set X-Auth-Token cookie with correct parameters when valid data is provided', () => {
        const loginData = {
          token: 'cookie-token-xyz',
          username: 'TestUser'
        };

        service.setLoginData(loginData);

        expect(mockCookieService.set).toHaveBeenCalled();
        const callArgs = mockCookieService.set.calls.mostRecent().args as unknown[];
        expect(callArgs[0]).toBe('X-Auth-Token');
        expect(callArgs[1]).toBe('cookie-token-xyz');
        expect(callArgs[2]).toBe(30);
        expect(callArgs[3]).toBe('/');
        expect(callArgs[4]).toBeUndefined();
        expect(callArgs[5]).toBe(true);
        expect(callArgs[6]).toBe('Lax');
      });
    });

    describe('TC-005: Navigate to /admin', () => {
      it('should navigate to /admin and replace state when valid data is provided', () => {
        const loginData = {
          token: 'nav-token',
          username: 'NavUser'
        };

        service.setLoginData(loginData);

        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/admin');
        expect(mockLocation.replaceState).toHaveBeenCalledWith('/admin');
      });
    });

    describe('TC-006: Return early if data is null', () => {
      it('should not dispatch action, set cookie, or navigate when data is null', () => {
        service.setLoginData(null);

        expect(mockStore.dispatch).not.toHaveBeenCalled();
        expect(mockCookieService.set).not.toHaveBeenCalled();
        expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
        expect(mockLocation.replaceState).not.toHaveBeenCalled();
      });
    });

    describe('TC-007: Return early if data.token is missing', () => {
      it('should not dispatch action, set cookie, or navigate when data.token is undefined', () => {
        const dataWithoutToken = {
          username: 'NoTokenUser',
          email: 'notoken@test.com'
        };

        service.setLoginData(dataWithoutToken);

        expect(mockStore.dispatch).not.toHaveBeenCalled();
        expect(mockCookieService.set).not.toHaveBeenCalled();
        expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
        expect(mockLocation.replaceState).not.toHaveBeenCalled();
      });
    });
  });

  describe('logout', () => {
    describe('TC-008: Set isLoggedIn to false', () => {
      it('should set isLoggedIn to false when logout is called', () => {
        service.isLoggedIn = true;

        service.logout();

        expect(service.isLoggedIn).toBe(false);
      });
    });

    describe('TC-009: Set userToken to null', () => {
      it('should set userToken to null when logout is called', () => {
        service.userToken = 'some-token';

        service.logout();

        expect(service.userToken).toBeNull();
      });
    });

    describe('TC-010: Dispatch clearUser action', () => {
      it('should dispatch clearUser action when logout is called', () => {
        service.logout();

        expect(mockStore.dispatch).toHaveBeenCalledWith(clearUser());
      });
    });

    describe('TC-011: Delete cookie', () => {
      it('should delete X-Auth-Token cookie when logout is called', () => {
        service.logout();

        expect(mockCookieService.delete).toHaveBeenCalledWith('X-Auth-Token');
      });
    });

    describe('TC-012: Navigate to root', () => {
      it('should navigate to root and replace state when logout is called', () => {
        service.logout();

        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
        expect(mockLocation.replaceState).toHaveBeenCalledWith('/');
      });
    });
  });

  describe('checkLogin', () => {
    describe('TC-013: Navigate to /admin when logged in', () => {
      it('should navigate to /admin and replace state when user is logged in', () => {
        service.isLoggedIn = true;

        service.checkLogin();

        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/admin');
        expect(mockLocation.replaceState).toHaveBeenCalledWith('/admin');
      });
    });

    describe('TC-014: Do not navigate when not logged in', () => {
      it('should not navigate when user is not logged in', () => {
        service.isLoggedIn = false;

        service.checkLogin();

        expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
        expect(mockLocation.replaceState).not.toHaveBeenCalled();
      });
    });
  });
});
