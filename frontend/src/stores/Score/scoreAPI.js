import { getAuthConfig } from '../authConfig';
import axios from '../Axioscutum';
import { scoreActions } from './scoreSlice';

const {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  postDone,
  deleteSuccess,
  updateSuccess,
} = scoreActions;

const fetchScoresByClass = (classId, type = '', page = 1, limit = 10) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`/score/class/${classId}`, {
      params: { type, page, limit },
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

const fetchScoresByUser = (userId, type = '', page = 1, limit = 10) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`/score/user/${userId}`, {
      params: { type, page, limit },
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

const createScore = (data) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.post('/score', data, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(postDone());
      dispatch(scoreActions.createSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

const updateScore = (scoreId, data) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.put(`/score/${scoreId}`, data, config);
    dispatch(updateSuccess(result.data));
    dispatch(postDone());
    return result.data;
  } catch (error) {
    dispatch(getError(error.message));
    return null;
  }
};

const deleteScore = (scoreId) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.delete(`/score/${scoreId}`, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(deleteSuccess(scoreId));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};
const batchUpdateScores = (scores) => async (dispatch) => {
  dispatch(scoreActions.getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.post('/score/batch', { scores }, config); // Hypothetical endpoint
    if (result.data.message) {
      dispatch(scoreActions.getFailed(result.data.message));
    } else {
      dispatch(scoreActions.getSuccess(result.data)); // Assuming API returns updated scores
      dispatch(scoreActions.postDone());
    }
    return result.data;
  } catch (error) {
    dispatch(scoreActions.getError(error.message));
    throw error;
  }
};
export {
  fetchScoresByClass,
  fetchScoresByUser,
  createScore,
  updateScore,
  deleteScore,
  batchUpdateScores 
};