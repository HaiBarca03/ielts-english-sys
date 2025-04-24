import React from 'react';
import { toast } from 'react-toastify';
import { removeUserFromClass } from '../../stores/classes/classAPI';

const RemoveUserFromClassToast = ({ classId, user, dispatch, onSuccess }) => {
  const handleConfirm = async () => {
    const success = await dispatch(removeUserFromClass(classId, user.user_id));
    toast.dismiss();

    if (success) {
      toast.success(`Đã xóa ${user.name || 'học viên'} khỏi lớp`);
      onSuccess?.();
    } else {
      toast.error('Xóa thất bại');
    }
  };

  return (
    <div>
      <p>Bạn có chắc muốn xóa học viên <strong>{user.name}</strong> khỏi lớp không?</p>
      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-danger btn-sm" onClick={handleConfirm}>Xóa</button>
        <button className="btn btn-secondary btn-sm" onClick={() => toast.dismiss()}>Hủy</button>
      </div>
    </div>
  );
};

export default RemoveUserFromClassToast;
