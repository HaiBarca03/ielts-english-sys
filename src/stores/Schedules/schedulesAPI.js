import { message } from 'antd';
import axios from '../Axioscutum';
import { 
  doneSuccess, 
  getError, 
  getFailed, 
  getRequest, 
  getSuccess,
  deleteSuccess,
  createSuccess,
  updateSuccess
} from './schedulesSlice';
import { getAuthConfig } from '../authConfig';



export const fetchSchedules = (page, limit , filters = {}) => async (dispatch) => {
    dispatch(getRequest());
    try {
      const config = getAuthConfig();
      const params = new URLSearchParams({
        page,
        limit,
        ...filters,config
      }).toString();
  
      const result = await axios.get(`/schedule?${params}`, getAuthConfig());
  
      if (result.status === 200 && result.data) {
        dispatch(getSuccess(result.data.schedules))
        return result.data.schedules;
      } else {
        dispatch(getFailed(result.data.message || 'Failed to fetch schedules'));
        message.error(result.data.message || 'Failed to fetch schedules');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch schedules';
      dispatch(getError(errorMessage));
      message.error(errorMessage);
    }
  };
  
  // Lấy chi tiết lịch học theo ID
  export const getScheduleById = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
      const result = await axios.get(`/schedule/${id}`, getAuthConfig());
  
      if (result.status === 200 && result.data) {
        dispatch(doneSuccess(result.data));
        return result.data;
      } else {
        dispatch(getFailed(result.data.message || 'Failed to fetch schedule details'));
        message.error(result.data.message || 'Failed to fetch schedule details');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch schedule details';
      dispatch(getError(errorMessage));
      message.error(errorMessage);
    }
  };
  
  // Tạo lịch học mới
  export const createSchedule = (scheduleData) => async (dispatch) => {
    dispatch(getRequest());
    try {
      const result = await axios.post('/schedule', scheduleData, getAuthConfig());
  
      if (result.status === 201 && result.data) {
        dispatch(createSuccess(result.data));
        message.success('Schedule created successfully');
        return result.data;
      } else {
        dispatch(getFailed(result.data.message || 'Failed to create schedule'));
        message.error(result.data.message || 'Failed to create schedule');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create schedule';
      dispatch(getError(errorMessage));
      message.error(errorMessage);
    }
  };
  
  // Cập nhật lịch học
  export const updateSchedule = (id, scheduleData) => async (dispatch) => {
    dispatch(getRequest());
    try {
      const result = await axios.put(`/schedule/${id}`, scheduleData, getAuthConfig());
  
      if (result.status === 200 && result.data) {
        dispatch(updateSuccess(result.data));
        message.success('Schedule updated successfully');
        return result.data;
      } else {
        dispatch(getFailed(result.data.message || 'Failed to update schedule'));
        message.error(result.data.message || 'Failed to update schedule');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update schedule';
      dispatch(getError(errorMessage));
      message.error(errorMessage);
    }
  };
  
  // Xóa lịch học
  export const deleteSchedule = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
      const result = await axios.delete(`/schedule/${id}`, getAuthConfig());
  
      if (result.status === 200) {
        dispatch(deleteSuccess(id));
        message.success('Schedule deleted successfully');
        return true;
      } else {
        dispatch(getFailed(result.data.message || 'Failed to delete schedule'));
        message.error(result.data.message || 'Failed to delete schedule');
        return false;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete schedule';
      dispatch(getError(errorMessage));
      message.error(errorMessage);
      return false;
    }
  };
  
  // Lấy lịch học theo user (student/teacher)
  export const getSchedulesByUser = (userId) => async (dispatch) => {
    dispatch(getRequest());
    try {
      const result = await axios.get(`/schedule/user/${userId}`, getAuthConfig());
  
      if (result.status === 200 && result.data) {
        dispatch(getSuccess(result.data));
        return result.data;
      } else {
        dispatch(getFailed(result.data.message || 'Failed to fetch user schedules'));
        message.error(result.data.message || 'Failed to fetch user schedules');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch user schedules';
      dispatch(getError(errorMessage));
      message.error(errorMessage);
    }
  };