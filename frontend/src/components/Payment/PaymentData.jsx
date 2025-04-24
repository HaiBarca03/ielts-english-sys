import React from 'react';
import { Table } from 'antd';

const PaymentData = ({ items, loading, onSelectItems, onRowClick, pagination }) => {
  const columns = [
    {
      title: 'Tên Học Viên',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Khóa Học',
      dataIndex: 'course',
      key: 'course',
    },
    {
      title: 'Ngày Thanh Toán',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
    },
    {
      title: 'Số Tiền',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  return (
    <Table
      rowSelection={{
        type: 'checkbox',
        onChange: (_, selectedRows) => onSelectItems(selectedRows),
      }}
      columns={columns}
      dataSource={items}
      loading={loading}
      pagination={pagination}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
      rowKey="payment_id"
    />
  );
};

export default PaymentData;