import { message } from 'antd';
import axios from '../Axioscutum';
import { createSuccess, deleteSuccess, getError, getFailed, getRequest, getSuccess, postDone, updateSuccess } from './userSlice';
import { getAuthConfig } from '../authConfig';

// Hàm đăng nhập người dùng (mới)
const loginUser = (data) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const result = await axios.post('/account/login', data, config);


    if (result.data.message && result.data.message !== 'Login successful') {
      dispatch(getFailed(result.data.message));
      throw new Error(result.data.message);
    }

    dispatch(postDone());

    if (result.data.token) {
      localStorage.setItem('user', JSON.stringify(result.data.user));
    } else {
      console.warn('Token not found in API response');
    }

    if (result.data.user) {
      localStorage.setItem('user', JSON.stringify(result.data.user));
    } else {
      console.warn('User not found in API response');
    }
  } catch (error) {
  
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
    dispatch(getError(errorMessage));
    console.error('Login error:', errorMessage);
    throw error; 
  }
};


export const createNewUser = (data) => async (dispatch) => {
 dispatch(getRequest());
  try {
    const result = await axios.post('/account/register', data, getAuthConfig());
    console.log(result.data)
    const createdClass = result.data;

    dispatch(createSuccess(createdClass));
    message.success('Tạo học Viên thành công');
    return createdClass;

  } catch (error) {
    dispatch(getFailed(error.result?.data?.message || 'Tạo học viên thất bại'));
    message.error('Tạo học viên thất bại');
    throw error; 
  }
};

const getUserByRole = (role) => async (dispatch) => {
  dispatch(getRequest());
  try {
    
    const config = getAuthConfig();
    
    const result = await axios.get(`/account/roles?role=${role}`, config);

    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
    return result.data;
  } catch (error) {
    dispatch(getError(error.message));
    throw error;
  }
};
const getStudentByRole = () => getUserByRole('Student');
const getTeacherByRole = () => getUserByRole('Teacher');
const getAdminByRole = () => getUserByRole('Admin');


const updateUser = (id, data) => async (dispatch) => {
  dispatch(getRequest());
  try {
    // const token = localStorage.getItem("token");
    const config = getAuthConfig();

    console.log("PUT Request:", { url: `/account/${id}`, data, config });

    const result = await axios.put(`/account/${id}`, data, config);
    console.log("Update response:", result);

    dispatch(updateSuccess(result.data));
    dispatch(postDone());

    return result.data; 
  } catch (error) {
    console.error("Update error in thunk:", error); 
    dispatch(getError(error.message));
    return null; 
  }
};

// Hàm xóa người dùng (giữ nguyên)
const deleteUser = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const body = {
      user_id: [id],
    };

    const result = await axios.delete('/account', {
      ...config,
      data: body, 
    });

    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(deleteSuccess(id));
    }
  } catch (error) {
    console.log('Error response:', error.response?.data);
    dispatch(getError(error.message));
  }
};

// Hàm lấy content class của người dùng theo userId (mới)
const getContentClassByUserId = (userId) => async (dispatch) => {
  dispatch(getRequest());
  try {
    // const token = localStorage.getItem('token');
        const config = getAuthConfig();
    const result = await axios.get(`/account/${userId}/content`, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};


// Hàm lấy thông tin người dùng theo ID (mới, khác với getStudentById vì endpoint khác)
const getUserById = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.get(`/account/${id}`, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

// Hàm lấy thông tin profile người dùng (mới)
const getUserProfile = () => async (dispatch) => {
  dispatch(getRequest());
  try {

    const config = getAuthConfig();
    const result = await axios.get('/account/profile', config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

// Hàm lấy class của người dùng theo userId (mới)
const getUserClassByUserId = (userId) => async (dispatch) => {
  dispatch(getRequest());
  try {

    const config = getAuthConfig();
    const result = await axios.get(`/account/user-class/${userId}`, config);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};

const getMyClasses = () => async (dispatch) => {
  dispatch(getRequest());
  try {
    const config = getAuthConfig();
    const result = await axios.get('/account/my-class', config);
    
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
    return result.data;
  } catch (error) {
    dispatch(getError(error.message));
    throw error;
  }
};
export {
  updateUser,
  deleteUser,
  getStudentByRole,
  getContentClassByUserId,
  loginUser,
  getUserById,
  getUserProfile,
  getUserClassByUserId,
  getTeacherByRole ,
  getAdminByRole,
  getMyClasses
};