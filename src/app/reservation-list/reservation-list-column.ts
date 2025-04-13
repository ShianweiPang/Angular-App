import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { Reservation } from '../models/reservation';
interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder | null;
  sortFn?: NzTableSortFn<Reservation> | null;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn<Reservation> | null;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
}
export const RESERVATION_COLUMNS_LIST: ColumnItem[] = [
  {
    name: 'Hotel Record ID',
    sortOrder: null,
    sortFn: (a: Reservation, b: Reservation) =>
      a.hotelRecordId!.localeCompare(b.hotelRecordId!),
    sortDirections: ['ascend', 'descend', null],
    filterMultiple: true,
    listOfFilter: [],
    filterFn: (list: string[], item: Reservation) =>
      list.some((name) => item.hotelRecordId!.indexOf(name) !== -1),
  },
  {
    name: 'Guest Name',
    sortOrder: null,
    sortFn: (a: Reservation, b: Reservation) =>
      a.guestName.localeCompare(b.guestName),
    sortDirections: ['ascend', 'descend', null],
    listOfFilter: [],
    filterFn: (list: string[], item: Reservation) =>
      list.some((guestName) => item.guestName!.indexOf(guestName) !== -1),
    filterMultiple: true,
  },
  {
    name: 'Guest Email',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: Reservation, b: Reservation) =>
      a.guestEmail.length - b.guestEmail.length,
    filterMultiple: false,
    listOfFilter: [],
    filterFn: (list: string[], item: Reservation) =>
      list.some((guestEmail) => item.guestEmail!.indexOf(guestEmail) !== -1),
  },
  {
    name: 'Room Number',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: (a: Reservation, b: Reservation) => a.roomNumber - b.roomNumber,
    filterMultiple: false,
    listOfFilter: [{ text: '888', value: 888 }],
    filterFn: (list: number[], item: Reservation) =>
      list.some((roomNumber) => item.roomNumber === roomNumber),
  },
  {
    name: 'Check in Date',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: null,
    filterMultiple: false,
    listOfFilter: [],
    filterFn: null,
  },
  {
    name: 'Check out Date',
    sortOrder: null,
    sortDirections: ['ascend', 'descend', null],
    sortFn: null,
    filterMultiple: false,
    listOfFilter: [],
    filterFn: null,
  },
  {
    name: 'Actions',
  },
];
