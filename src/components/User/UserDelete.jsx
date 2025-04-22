import React from 'react';
import { toast } from 'react-toastify';
import { deleteUser } from '../../stores/users/userAPI';

const DeleteUserToast = ({
  id,
  dispatch,
  deleteUser,
  onSuccess,
  message = 'Bạn có chắc muốn xóa dữ liệu này?',
}) => {
  const handleConfirm = () => {
    dispatch(deleteUser(id))
      .then(() => {
        toast.dismiss();
        toast.success('Xóa  thành công!');
        onSuccess?.();
      })
      .catch(() => {
        toast.error('Lỗi khi xóa !');
      });
  };

  return (
    <div>
      <p className="mb-3">{message}</p>
      <div className="d-flex gap-2 justify-content-end">
        <button className="btn btn-danger btn-sm" onClick={handleConfirm}>
          Xóa
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => toast.dismiss()}
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

const UserDelete = (dispatch, onSuccess) => {
  const handleDelete = (id) => {
    toast(
      <DeleteUserToast
        id={id}
        dispatch={dispatch}
        deleteUser={deleteUser}
        onSuccess={onSuccess}
      />,
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return handleDelete;
};

export default UserDelete;
