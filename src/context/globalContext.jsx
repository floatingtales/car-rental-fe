import React, { createContext, useReducer } from 'react';

import { carReducer, initialCarState } from '../reducer/carList';
import { bookingInputReducer, initialBookingInputState } from '../reducer/bookingInput';
import { bookingListReducer, initialBookingListState } from '../reducer/bookingList';

export const CarContext = createContext();
export const BookingInputContext = createContext();
export const BookingListContext = createContext();

export default function CarProvider({ children }) {
  const [carList, carListDispatch] = useReducer(carReducer, initialCarState);
  const [bookingInput, bookingInputDispatch] = useReducer(
    bookingInputReducer,
    initialBookingInputState,
  );
  const [bookingList, bookingListDispatch] = useReducer(
    bookingListReducer,
    initialBookingListState,
  );
  return (
    <CarContext.Provider value={{ carList, carListDispatch }}>
      <BookingInputContext.Provider value={{ bookingInput, bookingInputDispatch }}>
        <BookingListContext.Provider value={{ bookingList, bookingListDispatch }}>
          {children}
        </BookingListContext.Provider>
      </BookingInputContext.Provider>
    </CarContext.Provider>
  );
}
