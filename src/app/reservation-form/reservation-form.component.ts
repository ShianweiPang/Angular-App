import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
@Component({
  selector: 'app-reservation-form',
  standalone: false,
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});
  creationResult: Reservation | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = {
        ...this.reservationForm.value,
        checkInDate: new Date(
          this.reservationForm.value.checkInDate
        ).toISOString(),
        checkOutDate: new Date(
          this.reservationForm.value.checkOutDate
        ).toISOString(),
      };
      this.reservationService
        .createReservation(reservation)
        .subscribe((res) => {
          this.creationResult = res.data.createHotelReservation;
        });
    }
  }
}
