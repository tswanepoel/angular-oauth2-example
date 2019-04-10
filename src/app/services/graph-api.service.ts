import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of, combineLatest, merge } from 'rxjs';
import { map, mergeMap, mergeAll, filter } from 'rxjs/operators';
import { Profile } from '../models/profile';
import { CalendarEvent } from '../models/calendar-event';

const baseUrl = 'https://graph.microsoft.com/v1.0';

@Injectable({
  providedIn: 'root'
})
export class GraphApiService {

  constructor(private http: HttpClient) {
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${baseUrl}/me`);
  }

  getEvents(): Observable<Event> {
    return this.http
      .get(`${baseUrl}/me/events`)
      .pipe(
        map(x => (x as any).value),
        mergeAll()
      );
  }

  createEvent(event: CalendarEvent) {
    return this.http.post(`${baseUrl}/me/events`, event);
  }
}
