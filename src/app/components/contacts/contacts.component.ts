import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, map, scan, tap, debounceTime, bufferCount, filter, startWith, max } from 'rxjs/operators';
import { GraphApiService } from 'src/app/services/graph-api.service';
import { User } from 'src/app/models/user';
import { ODataResponse } from 'src/app/models/odata-response';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  private pageSize = 100;
  loading$ = new BehaviorSubject<boolean>(true);

  next$ = new BehaviorSubject<{ nextPosition: number, nextLink: string }>({ nextPosition: 1, nextLink: null });
  infinate$: Observable<{ nextLink: string, data: User[] }>;

  constructor(private graphApi: GraphApiService) { }

  ngOnInit() {
    const nextForwardOnly$ = this.next$.pipe(
      debounceTime(200),
      scan<{ nextPosition: number, nextLink: string }, { max: number, value: { nextPosition: number, nextLink: string } }>(
        (accu, x) => ({ max: x.nextPosition > accu.max ? x.nextPosition : accu.max, value: x }),
        ({ max: 0, value: { nextLink: null, nextPosition: 0 } })
      ),
      filter(x => x.value.nextPosition >= x.max),
      map(x => x.value)
    );

    this.infinate$ = nextForwardOnly$.pipe(
      tap(() => this.loading$.next(true)),
      mergeMap(x => x.nextLink ? this.graphApi.getNextUsers(x.nextLink) : this.graphApi.getUsers(this.pageSize)),
      map<ODataResponse<User[]>, { nextLink: string, data: User[] }>(x => ({ nextLink: x['@odata.nextLink'], data: x.value })),
      scan((acc, resp) => ({ nextLink: resp.nextLink, data: [ ...acc.data, ...resp.data ]}), { nextLink: null, data: []}),
      tap(() => this.loading$.next(false))
    );
  }

  loadNextUsers(nextPosition: number, nextLink: string) {
    if (nextLink) {
      this.next$.next({ nextPosition, nextLink });
    }
  }

}
