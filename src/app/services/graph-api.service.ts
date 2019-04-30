import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Profile } from '../models/profile';
import { User } from '../models/user';
import { CalendarEvent } from '../models/calendar-event';

@Injectable({
  providedIn: 'root'
})
export class GraphApiService {

  constructor(private http: HttpClient) {
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${environment.graphApiBaseUrl}/me`);
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get(`${environment.graphApiBaseUrl}/users`)
      .pipe(map(x => (x as any).value));
  }

  getEvents(): Observable<CalendarEvent[]> {
    return this.http
      .get(`${environment.graphApiBaseUrl}/me/events`)
      .pipe(map(x => (x as any).value));
  }

  createEvent(event: CalendarEvent) {
    return this.http.post(`${environment.graphApiBaseUrl}/me/events`, event);
  }
}
