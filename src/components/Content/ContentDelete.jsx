import React from 'react';
import { toast } from 'react-toastify';

const DeleteContentToast = ({ id, dispatch, deleteContent, fetchContentByProgram, message = 'Bạn có chắc muốn xóa nội dung này ?' }) => {
  const handleConfirm = () => {
    dispatch(deleteContent(id))
      .then(() => {
        toast.dismiss();
        toast.success('Xóa nội dung học thành công!');
        dispatch(fetchContentByProgram());
      })
      .catch(() => {
        toast.error('Lỗi khi xóa nội dung học!');
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

const ContentDelete = (dispatch, deleteContent, fetchContentByProgram) => {
  const handleDelete = (id) => {
    toast(
      <DeleteContentToast
        id={id}
        dispatch={dispatch}
        deleteContent={deleteContent}
        fetchContentByProgram={fetchContentByProgram}
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

export default ContentDelete;