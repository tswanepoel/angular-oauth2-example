import { Component, OnInit } from '@angular/core';
import { GraphApiService } from 'src/app/services/graph-api.service';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  profile$: Observable<Profile>;

  constructor(private graphApi: GraphApiService) { }

  ngOnInit() {
    this.profile$ = this.graphApi.getProfile();
  }

}
