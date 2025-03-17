export interface Reservation {
  hotelRecordId?: string;
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
  guestEmail: string;
  roomNumber: number;
  status?: string;
}
