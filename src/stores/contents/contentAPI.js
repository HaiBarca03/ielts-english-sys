import { getAuthConfig } from '../authConfig';
import axios from '../Axioscutum';
import { doneSuccess, getError, getFailed, getRequest, getSuccess, postDone } from './contentSlide';



export const fetchContents = () => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get('/contents');
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

export const fetchContentByProgram = (programId, page = 1, limit = 10, type = '') => {
  return async (dispatch) => {
    dispatch(getRequest()); 
    try {
      const response = await axios.get(`/contents/program/${programId}`, {
        params: {
          page,
          limit,
          type, 
        },
      });
      dispatch(getSuccess(response.data)); 
    } catch (error) {
      dispatch(getError(error.message));
    }
  };
};

export const createNewContent = (data) => async (dispatch) => {
  dispatch(getRequest());
  try {
        const config = getAuthConfig()
    const result = await axios.post('/contents', data, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(postDone());
      dispatch(fetchContents()); 
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};


export const getContentById = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`/contents/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};


export const updateContent = (id, data) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig()
    const result = await axios.put(`/contents/${id}`, data, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(postDone());
      dispatch(fetchContents());
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};


export const deleteContent = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig()
    const result = await axios.delete(`/contents/${id}`, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(fetchContents());
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};
