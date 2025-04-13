import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  CREATE_HOTELRESERVATION,
  DELETE_HOTELRESERVATION,
  GET_ALL_HOTELRESERVATION,
  GET_HOTELRESERVATION,
  UPDATE_HOTELRESERVATION,
} from './reservation.graphql';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor(private apollo: Apollo) {}

  // CRUD
  getReservations(): Observable<any> {
    return this.apollo.query({
      query: GET_ALL_HOTELRESERVATION,
      fetchPolicy: 'network-only',
    });
  }

  getReservation(id: string): Observable<any> {
    const hotelRecordId = id;
    return this.apollo.query({
      query: GET_HOTELRESERVATION,
      variables: { hotelRecordId: hotelRecordId },
    });
  }

  createReservation(model: Reservation): Observable<any> {
    const reservation: Reservation = model;

    return this.apollo.mutate({
      mutation: CREATE_HOTELRESERVATION,
      variables: reservation,
    });
  }

  updateReservation(model: Reservation): Observable<any> {
    const reservation: Reservation = model;

    return this.apollo.mutate({
      mutation: UPDATE_HOTELRESERVATION,
      variables: reservation,
    });
  }

  deleteReservation(id: string): Observable<any> {
    const hotelRecordId = id;
    return this.apollo.mutate({
      mutation: DELETE_HOTELRESERVATION,
      variables: { hotelRecordId: hotelRecordId },
    });
  }
}
