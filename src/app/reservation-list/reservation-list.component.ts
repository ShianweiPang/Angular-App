import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { AuthService } from '../../app/utils/auth.service';

@Component({
  selector: 'app-reservation-list',
  standalone: false,
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((res) => {
      this.reservations = res.data.records;
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
