import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor() {}

  // CRUD
  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    var res = this.reservations.find(
      (reservation: Reservation) => reservation.id == id
    );
    return res;
  }

  createReservation(model: Reservation): void {
    const reservation: Reservation = {
      id: this.generateUID(),
      ...model,
    };
    this.reservations.push(reservation);
  }

  updateReservation(model: Reservation): void {
    this.reservations = this.reservations.map((reservation: Reservation) => {
      if (model.id === reservation.id) {
        return { ...reservation, ...model };
      }
      return reservation;
    });
  }

  deleteReservation(id: string): void {
    this.reservations = this.reservations.filter(
      (reservation: Reservation) => reservation.id != id
    );
  }

  generateUID(): string {
    const prefix = 'HBR';
    const id_list = this.reservations.map((reservation: Reservation) => {
      if (reservation.id) {
        return parseInt(reservation.id.slice(3));
      }
      return 0;
    });
    const nextNum = Math.max(...id_list) + 1;
    const nextId = `${prefix}${nextNum.toString().padStart(3, '0')}`;

    return nextId;
  }
}
