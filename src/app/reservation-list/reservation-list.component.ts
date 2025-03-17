import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  standalone: false,
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((res) => {
      this.reservations = res.data.records;
    });
  }
}
