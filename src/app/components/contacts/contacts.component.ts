import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GraphApiService } from 'src/app/services/graph-api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {

  users$: Observable<User[]>;
  loading$ = new BehaviorSubject<boolean>(true);

  constructor(private graphApi: GraphApiService) { }

  ngOnInit() {
    this.users$ = this.graphApi.getUsers().pipe(tap(() => this.loading$.next(false)));
  }

}
