import { getAuthConfig } from '../authConfig';
import axios from '../Axioscutum';
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  doneSuccess,
  postDone,
  deleteSuccess,
  updateSuccess,
} from './programSlice';


const fetchPrograms = (page = 1, limit = 10) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get('/programs', {
      params: { page, limit },
    });
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
      return result.data;
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};


const createNewProgram = (data) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.post('/programs', data, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(postDone());
      dispatch(fetchPrograms()); 
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};


const getProgramById = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`/programs/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};


const updateProgram = (id, data) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    console.log("PUT Request:", { url: `/programs/${id}`, data, config });

    const result = await axios.put(`/programs/${id}`, data, config);
    console.log("Update response:", result);

    dispatch(updateSuccess(result.data));
    dispatch(postDone());

    return result.data; // <- cái này sẽ được trả về trong actionResult ở ProgramUpdate.jsx
  } catch (error) {
    console.error("Update error in thunk:", error); // thêm log tại đây
    dispatch(getError(error.message));
    return null; // rõ ràng return null nếu có lỗi
  }
};


const deleteProgram = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig()
    const result = await axios.delete(`/programs/${id}`, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
        dispatch(deleteSuccess(id));
        dispatch(fetchPrograms());
    }
  } catch (error) {
    console.log("Error response:", error.response?.data);
    dispatch(getError(error.message));
  }
};
export  {
    fetchPrograms ,
    createNewProgram,
    getProgramById,
    updateProgram,
    deleteProgram
}