import { toast } from "react-toastify";

const DeleteProgramToast = ({ id, dispatch, deleteProgram, fetchPrograms, message = "Bạn có chắc muốn xóa khóa học này ?" }) => {
    const handleConfirm = () => {
        dispatch(deleteProgram(id)).then(() => {
          toast.dismiss();
          toast.success("Xóa khóa học thành công!");
          dispatch(fetchPrograms());
        }).catch(() => {
          toast.error("Lỗi khi xóa khóa học!");
        });
      };

  return (
    <div>
      <p className="mb-3">{message}</p>
      <div className="d-flex gap-2 justify-content-end ">
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

const DeleteProgram = (dispatch, deleteProgram, fetchPrograms) => {
  const handleDelete = (id) => {
    toast(
      <DeleteProgramToast
        id={id}
        dispatch={dispatch}
        deleteProgram={deleteProgram}
        fetchPrograms={fetchPrograms}
      />,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return handleDelete;
};

export default DeleteProgram;