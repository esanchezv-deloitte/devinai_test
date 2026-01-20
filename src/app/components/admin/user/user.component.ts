import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpService } from '../../../services/http.service';
import { map } from 'rxjs';
export interface PeriodicElement {
  name: string;
  phone: number;
  address: number;
  blood: string;
}

@Component({
    selector: 'app-user',
    imports: [MatTableModule, MatSortModule],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    providers: [HttpService]
})
export class UserComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'phone', 'address', 'blood'];
  dataSource = new MatTableDataSource([]);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _httpService: HttpService,
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.getUserList();
  }

  getUserList() {
    this._httpService
      .getUserList()
      .pipe(
        map((val) => {
          return val.users.map((u: any) => {
            return {
              name: u.firstName,
              phone: u.phone,
              address: u.address.address,
              blood: u.bloodGroup,
            };
          });
        }),
      )
      .subscribe({
        next: (value) => {
          this.dataSource = new MatTableDataSource(value)
          this.dataSource.sort = this.sort;
        },
      });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    console.log(sortState)
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
