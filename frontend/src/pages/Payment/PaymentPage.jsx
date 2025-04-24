import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Tag, message } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import moment from 'moment';

// Mock data
const mockPaymentsList = {
  payments: [
    {
      payment_id: '1',
      student_name: 'Nguyễn Văn An',
      amount: 1500000,
      payment_date: '2025-04-20',
      status: 'Completed',
      course_name: 'IELTS Preparation',
    },
    {
      payment_id: '2',
      student_name: 'Trần Thị Bình',
      amount: 800000,
      payment_date: '2025-04-19',
      status: 'Pending',
      course_name: 'General English',
    },
    {
      payment_id: '3',
      student_name: 'Lê Văn Cường',
      amount: 1000000,
      payment_date: '2025-04-18',
      status: 'Failed',
      course_name: 'English for Kids',
    },
    {
      payment_id: '4',
      student_name: 'Phạm Thị Duyên',
      amount: 1200000,
      payment_date: '2025-04-17',
      status: 'Completed',
      course_name: 'Business English',
    },
    {
      payment_id: '4',
      student_name: 'Phạm Thị Duyên',
      amount: 1200000,
      payment_date: '2025-04-17',
      status: 'Completed',
      course_name: 'Business English',
    },
    {
      payment_id: '5',
      student_name: 'Phạm Linh Chi',
      amount: 1200000,
      payment_date: '2025-04-17',
      status: 'Completed',
      course_name: 'Business English',
    },
    {
      payment_id: '6',
      student_name: 'Phạm Lan Chi',
      amount: 1200000,
      payment_date: '2025-04-17',
      status: 'Completed',
      course_name: 'Business English',
    },
    {
      payment_id: '7',
      student_name: 'Phạm Minh',
      amount: 1200000,
      payment_date: '2025-04-17',
      status: 'Completed',
      course_name: 'Business English',
    },
    {
      payment_id: '8',
      student_name: 'Phạm Thị Hai',
      amount: 1200000,
      payment_date: '2025-04-17',
      status: 'Completed',
      course_name: 'Business English',
    },
  ],
  totalItems: 8,
};

const PaymentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsList, setPaymentsList] = useState(mockPaymentsList);
  const [loading, setLoading] = useState(false);
  const paymentsPerPage = 10;

  // Giả lập lấy dữ liệu
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPaymentsList(mockPaymentsList);
      setLoading(false);
    }, 500);
  }, [currentPage]);

  const handleExport = () => {
    message.info('Chức năng xuất Excel đang được phát triển!');
  };

  const payments = Array.isArray(paymentsList?.payments) ? paymentsList.payments : [];

  const columns = [
    {
      title: 'Học Viên',
      dataIndex: 'student_name',
      key: 'student_name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Khóa Học',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: 'Số Tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${amount.toLocaleString('vi-VN')} VNĐ`,
    },
    {
      title: 'Ngày Thanh Toán',
      dataIndex: 'payment_date',
      key: 'payment_date',
      render: (date) => moment(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        switch (status) {
          case 'Completed':
            color = 'green';
            break;
          case 'Pending':
            color = 'orange';
            break;
          case 'Failed':
            color = 'red';
            break;
          default:
            color = 'blue';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const pagination = {
    current: currentPage,
    pageSize: paymentsPerPage,
    total: paymentsList?.totalItems || 0,
    onChange: (page) => setCurrentPage(page),
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Card
        title={
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Danh Sách Thanh Toán
          </span>
        }
        extra={
          <Button
            type="primary"
            icon={<FileExcelOutlined />}
            onClick={handleExport}
            style={{ background: '#1b74ff', borderColor: '#52c41a' }}
          >
            Export
          </Button>
        }
        style={{
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <Table
          columns={columns}
          dataSource={payments}
          loading={loading}
          pagination={pagination}
          rowKey="payment_id"
          bordered
          style={{ background: '#fff' }}
          scroll={{ x: true }}
          locale={{ emptyText: 'Không có dữ liệu thanh toán' }}
        />
      </Card>
    </div>
  );
};

export default PaymentPage;