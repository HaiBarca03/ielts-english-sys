// src/api/authConfig.js


export const getAuthConfig = () => {
  const user =  JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };
};
