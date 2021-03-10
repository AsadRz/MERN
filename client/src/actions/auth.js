import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './constants';

//REGiSTER USER
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(
      'http://localhost:5000/api/users',
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.responseData.token,
    });
  } catch (error) {
    console.error(error.response);
    setAlert(error.response.data, 'danger');
    dispatch({ type: REGISTER_FAIL });
  }
};
