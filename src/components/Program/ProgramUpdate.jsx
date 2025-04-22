import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { updateProgram, fetchPrograms } from "../../stores/programs/programAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ProgramUpdate = ({ show, onClose, program }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (program) {
      form.setFieldsValue({
        brand_name: program.brand_name,
        description: program.description,
      });
    }
  }, [program, form]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      console.log("Submitting update for program:", program.program_id, values);
      const actionResult = await dispatch(updateProgram(program.program_id, values));
      if (actionResult) {
        await dispatch(fetchPrograms());
        toast.success("Cập nhật khóa học thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
        onClose();
      } else {
        toast.error("Cập nhật thất bại hoặc không có dữ liệu trả về!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (err) {
      console.error("Update error:", err);
      if (err.message === "Missing authentication token") {
        toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
        navigate("/login");
      } else {
        toast.error(err.message || "Có lỗi xảy ra khi cập nhật khóa học!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Cập nhật khóa học"
      open={show}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={isLoading ? "Đang cập nhật..." : "Cập nhật"}
      cancelText="Hủy"
      centered
      okButtonProps={{ disabled: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          brand_name: "",
          description: "",
        }}
        disabled={isLoading}
      >
        <Form.Item
          label="Tên khóa học"
          name="brand_name"
          rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}
        >
          <Input placeholder="Nhập tên khóa học" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea rows={3} placeholder="Nhập mô tả khóa học" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProgramUpdate;