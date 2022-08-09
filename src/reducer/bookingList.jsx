import axios from 'axios';
import actions from './bookingListAction';

const { ERROR, RETRIEVE, DELETE } = actions;

export const initialBookingListState = [];

export function bookingListReducer(bookingListState, action) {
  switch (action.type) {
    case RETRIEVE:
      return [...action.payload.data];
    default:
      return bookingListState;
  }
}

export async function getData() {
  let gotData;
  try {
    gotData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/bookings/getAll`);
  } catch (err) {
    return {
      type: ERROR,
      payload: {
        error: err,
      },
    };
  }
  return {
    type: RETRIEVE,
    payload: {
      data: gotData.data.data,
    },
  };
}

export async function deleteListing(bookingId) {
  await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/bookings/deleteOne/${bookingId}`);
  return {
    type: DELETE,
    payload: {
      bookingId,
    },
  };
}
