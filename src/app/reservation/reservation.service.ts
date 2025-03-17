import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  CREATE_HOTELRESERVATION,
  GET_HOTELRESERVATION,
} from './reservation.graphql';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor(private apollo: Apollo) {}

  // CRUD
  getReservations(): Observable<any> {
    return this.apollo.watchQuery({ query: GET_HOTELRESERVATION }).valueChanges;
  }

  getReservation(id: string): Reservation | undefined {
    var res = this.reservations.find(
      (reservation: Reservation) => reservation.hotelRecordId == id
    );
    return res;
  }

  createReservation(model: Reservation): Observable<any> {
    const reservation: Reservation = model;

    return this.apollo.mutate({
      mutation: CREATE_HOTELRESERVATION,
      variables: reservation,
    });
  }

  updateReservation(model: Reservation): void {
    this.reservations = this.reservations.map((reservation: Reservation) => {
      if (model.hotelRecordId === reservation.hotelRecordId) {
        return { ...reservation, ...model };
      }
      return reservation;
    });
  }

  deleteReservation(id: string): void {
    this.reservations = this.reservations.filter(
      (reservation: Reservation) => reservation.hotelRecordId != id
    );
  }
}
