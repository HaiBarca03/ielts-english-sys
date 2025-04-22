import React from 'react';
import { toast } from 'react-toastify';
import { deleteClass, fetchClasses } from '../../stores/classes/classAPI';

const DeleteClassToast = ({ classId, dispatch, deleteClass, fetchClasses, message = 'Bạn có chắc muốn xóa lớp học này?' }) => {
  const handleConfirm = () => {
    dispatch(deleteClass(classId))
      .then(() => {
        toast.dismiss();
        toast.success('Xóa lớp học thành công!');
        dispatch(fetchClasses());
      })
      .catch(() => {
        toast.error('Lỗi khi xóa lớp học!');
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

const ClassDelete = (dispatch) => {
  const handleDelete = (classId) => {
    toast(
      <DeleteClassToast
        classId={classId}
        dispatch={dispatch}
        deleteClass={deleteClass}
        fetchClasses={fetchClasses}
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

export default ClassDelete;