import { message } from 'antd';
import axios from '../Axioscutum';
import { 
  doneSuccess, 
  getError, 
  getFailed, 
  getRequest, 
  getSuccess,
  postDone,
  // deleteSuccess,
  createSuccess,
  updateSuccess,
  deleteSuccess
} from './classSlice';
import { getAuthConfig } from '../authConfig';


export const fetchRecentClasses = () => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.get('/class', {
      params: { 
        page: 1, 
        limit: 5, 
        sort: 'created_at:desc' 
      },
      ...config,
    });
    if (result.data?.classes) {
      dispatch(getSuccess({ recentClasses: result.data.classes }));
      return result.data.classes;
    }
    dispatch(getFailed('Invalid API response'));
  } catch (error) {
    console.error('Error fetching recent classes:', error);
    dispatch(getError(error.message));
  }
};
// Get all classes with pagination
export const fetchClasses = (page = 1, limit = 10, search = '') => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.get(`/class?page=${page}&limit=${limit}&search=${search}`, config);

    if (result.status === 200 && result.data) {
      dispatch(getSuccess(result.data));
      return result.data;
    } else {
      dispatch(getFailed(result.data.message || 'Failed to fetch classes'));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    dispatch(getError(errorMessage));
  }
};

// Get a class by ID
export const getClassById = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.get(`/class/${id}`, config);

    if (result.data.classInfo) {
      dispatch(doneSuccess(result.data.classInfo));
      return result.data.classInfo;
    } else {
      dispatch(getFailed(result.data.message));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

// Create new class
export const createClass = (newClass) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const response = await axios.post('/class', newClass, getAuthConfig());
    const createdClass = response.data;

    dispatch(createSuccess(createdClass));
    message.success('Tạo lớp học thành công');
    return createdClass;

  } catch (error) {
    dispatch(getFailed(error.response?.data?.message || 'Tạo lớp học thất bại'));
    message.error('Tạo lớp học thất bại');
    throw error; 
  }
};

// Update class
export const updateClass = (id, classData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.put(`/class/${id}`, classData, config);

    if (result.status === 200 && result.data) {
      dispatch(updateSuccess(result.data));
      message.success('Class updated successfully');
      return result.data;
    } else {
      dispatch(getFailed(result.data.message));
      message.error(result.data.message || 'Failed to update class');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update class';
    dispatch(getError(errorMessage));
    message.error(errorMessage);
  }
};

// Delete class
export const deleteClass = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.delete(`/class/${id}`, config);

    if (result.status === 200) {
      dispatch(deleteSuccess(id));
      message.success('Class deleted successfully');
      return true;
    } else {
      dispatch(getFailed(result.data.message));
      message.error(result.data.message || 'Failed to delete class');
      return false;
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete class';
    dispatch(getError(errorMessage));
    message.error(errorMessage);
    return false;
  }
};

// Get classes by program
export const getClassesByProgram = (programId) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.get(`/class/program/${programId}`, config);

    if (result.status === 200 && result.data) {
      dispatch(getSuccess(result.data));
      return result.data;
    } else {
      dispatch(getFailed(result.data.message || 'Failed to fetch classes by program'));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch classes by program';
    dispatch(getError(errorMessage));
  }
};

// Count students in class
export const countStudentsInClass = (classId) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.get(`/class/count-student-class/${classId}`, config);

    if (result.status === 200 && result.data) {
      return result.data.count;
    } else {
      dispatch(getFailed(result.data.message || 'Failed to count students'));
      return 0;
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to count students';
    dispatch(getError(errorMessage));
    return 0;
  }
};

// Add user to class

export const addUserToClass = (classId, userId) => async (dispatch) => {
  dispatch(getRequest());
  try {
    console.log('Sending payload to addUserToClass:', { classId, userId });
    const response = await axios.post('/class/add-user', { classId, userId }, getAuthConfig());
    console.log('addUserToClass response:', response.data);
    dispatch(postDone());
    message.success('Thêm người dùng vào lớp học thành công');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to add user to class';
    console.error('addUserToClass error:', errorMessage);
    dispatch(getFailed(errorMessage));
    message.error(errorMessage);
    return null;
  }
};
// Remove user from class
export const removeUserFromClass = (classId, userId) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.delete(`/class/${classId}/user/${userId}`, config);

    if (result.status === 200) {
      dispatch(postDone());
      message.success('User removed from class successfully');
      return true;
    } else {
      dispatch(getFailed(result.data.message));
      message.error(result.data.message || 'Failed to remove user from class');
      return false;
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to remove user from class';
    dispatch(getError(errorMessage));
    message.error(errorMessage);
    return false;
  }
};

// export const deleteClass = (classId) => async (dispatch) => {
//   dispatch(getRequest());
//   try {
//     const config = getAuthConfig();

//     let schedules = [];
//     try {
//       const schedulesResponse = await axios.get(`/schedule/?class_id=${classId}`, config);
//       schedules = Array.isArray(schedulesResponse.data.schedules.items) ? schedulesResponse.data.schedules.items : [];
//       console.log('Schedules to delete:', schedules);
//     } catch (error) {
//       console.warn(`Schedules endpoint not found for class ID: ${classId}`, error);
//     }

//     let users = [];
//     try {
//       const usersResponse = await axios.get(`/class/${classId}`, config);
//       users = Array.isArray(usersResponse.data.classInfo.Users) ? usersResponse.data.classInfo.Users : [];
//       console.log('Users to remove from class:', users);
//     } catch (error) {
//       console.warn(`Users endpoint not found for class ID: ${classId}`, error);
//     }

//     for (const schedule of schedules) {
//       try {
//         await axios.delete(`/schedule/${schedule.schedule_id}`, config);
//         console.log(`Deleted schedule with ID: ${schedule.schedule_id}`);
//       } catch (error) {
//         console.error(`Failed to delete schedule with ID: ${schedule.schedule_id}`, error);
//       }
//     }


//     for (const user of users) {
//       try {
//         await axios.delete(`/class/${classId}/user/${user.user_id}`, config);
//         console.log(`Removed user with ID: ${user.user_id} from class`);
//       } catch (error) {
//         console.error(`Failed to remove user with ID: ${user.user_id} from class`, error);
//       }
//     }

//     try {
//       const result = await axios.delete(`/class/${classId}`, config);
//       console.log('Class deletion response:', result.data);

//       if (result.status === 200) {
//         dispatch(postDone());
//         message.success('Xóa lớp học thành công!');
//         return true;
//       } else {
//         const errorMessage = result.data?.message || 'Failed to delete class';
//         dispatch(getFailed(errorMessage));
//         message.error(errorMessage);
//         throw new Error(errorMessage);
//       }
//     } catch (error) {
//       console.error('Error deleting class:', error);
//       throw error;
//     }
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message || 'Failed to delete class and related data';
//     console.error('Error deleting class:', errorMessage);
//     dispatch(getError(errorMessage));
//     message.error(errorMessage);
//     throw new Error(errorMessage);
//   }
// };