import { gql } from 'apollo-angular';
export const GET_HOTELRESERVATION = gql`
  query {
    records {
      hotelRecordId
      checkInDate
      checkOutDate
      guestName
      guestEmail
      roomNumber
    }
  }
`;

export const CREATE_HOTELRESERVATION = gql`
  mutation CreateHotelReservation(
    $guestName: String!
    $guestEmail: String!
    $roomNumber: Int!
    $checkInDate: DateTime!
    $checkOutDate: DateTime!
  ) {
    createHotelReservation(
      guestName: $guestName
      guestEmail: $guestEmail
      roomNumber: $roomNumber
      checkInDate: $checkInDate
      checkOutDate: $checkOutDate
    ) {
      hotelRecordId
      guestName
      guestEmail
      roomNumber
      checkInDate
      checkOutDate
      status
    }
  }
`;

export const DELETE_HOTELRESERVATION = gql`
  mutation ExampleQuery($hotelRecordId: String!) {
    deleteHotelReservation(hotelRecordId: $hotelRecordId) {
      acknowledged
      deletedCount
    }
  }
`;
