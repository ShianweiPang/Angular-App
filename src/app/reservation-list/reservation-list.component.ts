import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { AuthService } from '../../app/utils/auth.service';
import { RESERVATION_COLUMNS_LIST } from './reservation-list-column';

@Component({
  selector: 'app-reservation-list',
  standalone: false,
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  columns = RESERVATION_COLUMNS_LIST;
  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('SOMETHING CALLED ME');
    this.reservationService.getReservations().subscribe((res) => {
      console.log(res.data.records);
      this.reservations = res.data.records;
      console.log(this.reservations);
      console.log('SOMETHING CALLED ME DONE');
    });
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id).subscribe((res) => {
      alert(
        `${res.data.deleteHotelReservation.acknowledged} - ${res.data.deleteHotelReservation.deletedCount}`
      );
    });
  }
}
