import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});
  creationResult: Reservation | undefined;
  currReservation: Reservation | undefined;
  date = null;
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      dateRange: [null, Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.reservationService.getReservation(id).subscribe((res) => {
        const checkInDate = this.datePipe.transform(
          res.data.record.checkInDate,
          'yyyy-MM-dd'
        );
        const checkOutDate = this.datePipe.transform(
          res.data.record.checkOutDate,
          'yyyy-MM-dd'
        );
        this.currReservation = {
          ...res.data.record,
          checkInDate,
          checkOutDate,
        };
        const dateRange = [checkInDate, checkOutDate];
        if (this.currReservation) {
          this.reservationForm.patchValue({
            ...this.currReservation,
            dateRange: dateRange,
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      const [checkIn, checkOut] = this.reservationForm.value.dateRange;

      let reservation: Reservation = {
        ...this.reservationForm.value,
        checkInDate: new Date(checkIn).toISOString(),
        checkOutDate: new Date(checkOut).toISOString(),
      };

      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.reservationService
          .updateReservation({ ...reservation, hotelRecordId: id })
          .subscribe((res) => {
            this.router.navigate(['/list']);
          });
      } else {
        this.reservationService
          .createReservation(reservation)
          .subscribe((res) => {
            this.creationResult = res.data.createHotelReservation; // can create a modal afterwards
            this.router.navigate(['/list']);
          });
      }
    }
  }

  dateOnChange(result: Date[]) {
    console.log('onChange: ', result);
  }
}
