import axios from 'axios';
import actions from './carListActions';

const { GET, ERROR, RETRIEVE } = actions;

export const initialCarState = [];

// reducer function
export function carReducer(carState, action) {
  switch (action.type) {
    case ERROR:
      return carState;
    case GET:
      return carState;
    case RETRIEVE:
      return [...action.payload.data];
    default:
      return carState;
  }
}

// action creators
export async function getData() {
  let gotData;
  try {
    gotData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cars/getAll`);
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
