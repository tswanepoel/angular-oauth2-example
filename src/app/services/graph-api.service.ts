import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Profile } from '../models/profile';
import { ODataResponse } from '../models/odata-response';
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

  getUsers(top?: number): Observable<ODataResponse<User[]>> {
    let queryString = '?$orderby=displayName';

    if (top) {
      queryString += `${queryString ? '&' : '?'}$top=${top}`;
    }

    return this.getNextUsers(`${environment.graphApiBaseUrl}/users${queryString}`);
  }

  getNextUsers(nextLink: string): Observable<ODataResponse<User[]>> {
    return this.http.get<ODataResponse<User[]>>(nextLink);
  }

  getEvents(): Observable<ODataResponse<CalendarEvent[]>> {
    return this.http.get<ODataResponse<CalendarEvent[]>>(`${environment.graphApiBaseUrl}/me/events`);
  }

  createEvent(event: CalendarEvent) {
    return this.http.post(`${environment.graphApiBaseUrl}/me/events`, event);
  }
}
