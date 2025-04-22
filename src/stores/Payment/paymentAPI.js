import { getAuthConfig } from '../authConfig';
import axios from '../Axioscutum';
import { paymentActions } from './paymentSlice';

const {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  doneSuccess,
  postDone,
  deleteSuccess,
  updateSuccess,
} = paymentActions;

const fetchAllPayments = (page = 1, limit = 10) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get('/payment', {
      params: { page, limit },
    });
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

const fetchPaymentById = (paymentId) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`/payment/${paymentId}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

const fetchPaymentsByProgram = (programId, page = 1, limit = 10) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`/payment/program/${programId}`, {
      params: { page, limit },
    });
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

const fetchPaymentsByUser = (userId, page = 1, limit = 10) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`/payment/user/${userId}`, {
      params: { page, limit },
    });
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

const createPayment = (data) => async (dispatch) => {
  dispatch(getRequest());
  try {
        const config = getAuthConfig()
    const result = await axios.post('/payment', data, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(postDone());
      dispatch(paymentActions.createSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

const updatePayment = (paymentId, data) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig()
    const result = await axios.put(`/payment/${paymentId}`, data, config);
    dispatch(updateSuccess(result.data));
    dispatch(postDone());
    return result.data;
  } catch (error) {
    dispatch(getError(error.message));
    return null;
  }
};

const deletePayment = (paymentId) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig()
    const result = await axios.delete(`/payment/${paymentId}`, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(deleteSuccess(paymentId));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

export {
  fetchAllPayments,
  fetchPaymentById,
  fetchPaymentsByProgram,
  fetchPaymentsByUser,
  createPayment,
  updatePayment,
  deletePayment
};