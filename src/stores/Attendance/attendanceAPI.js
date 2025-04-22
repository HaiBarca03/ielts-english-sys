import { getAuthConfig } from '../authConfig';
import axios from '../Axioscutum';
import { attendanceActions } from './attendanceSlice';

const {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  postDone,
  deleteSuccess,
  updateSuccess,
} = attendanceActions;

const fetchAttendanceByClass = (classId, page = 1, limit = 10) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig()
    const result = await axios.get(`/attendance/class/${classId}`, {
      params: { page, limit },config
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

const fetchAttendanceByUser = (userId, page = 1, limit = 10) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig()
    const result = await axios.get(`/attendance/user/${userId}`, {
      params: { page, limit },config
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

const createAttendance = (data) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig()
    const result = await axios.post('/attendance', data, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(postDone());
      dispatch(attendanceActions.createSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

const updateAttendance = (id, data) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig()
    const result = await axios.put(`/attendance/${id}`, data, config);
    dispatch(updateSuccess(result.data));
    dispatch(postDone());
    return result.data;
  } catch (error) {
    dispatch(getError(error.message));
    return null;
  }
};

const deleteAttendance = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig()
    const result = await axios.delete(`/attendance/${id}`, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(deleteSuccess(id));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

export {
  fetchAttendanceByClass,
  fetchAttendanceByUser,
  createAttendance,
  updateAttendance,
  deleteAttendance
};