import moment from 'moment';
import actions from './bookingInputActions';

const { SET, SET_TIME, RESET } = actions;

export const initialBookingInputState = {
  startDate: moment(), endDate: moment(), userEmail: '', userFname: '', userLname: '',
};

// reducer function
export function bookingInputReducer(inputState, action) {
  switch (action.type) {
    case SET: {
      const updatedState = { ...inputState };
      updatedState[action.payload.key] = action.payload.value;
      return { ...updatedState };
    }
    case SET_TIME: {
      if (action.payload.key === 'startDate' && inputState.endDate < action.payload.value) {
        return { ...inputState, startDate: inputState.endDate };
      } if (action.payload.key === 'endDate' && inputState.startDate > action.payload.value) {
        return { ...inputState, endDate: inputState.startDate };
      }
      const updatedState = { ...inputState };
      updatedState[action.payload.key] = action.payload.value;
      return { ...updatedState };
    }
    case RESET:
      return { ...initialBookingInputState };
    default:
      return inputState;
  }
}

// action creators
export function updateData(key, value) {
  if (key === 'startDate' || key === 'endDate') {
    return {
      type: SET_TIME,
      payload: {
        key,
        value,
      },
    };
  }
  return {

    type: SET,
    payload: {
      key,
      value,
    },
  };
}

export function resetInput() {
  return {
    type: RESET,
    payload: {

    },
  };
}
