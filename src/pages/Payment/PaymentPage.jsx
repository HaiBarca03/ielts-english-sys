import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionBar from '../../components/ActionBar';

import PaymentAdd from '../../components/Payment/PaymentAdd';
import PaymentUpdate from '../../components/Payment/PaymentUpdate';
import { deletePayment, fetchAllPayments } from '../../stores/Payment/paymentAPI';
import PaymentData from '../../components/Payment/PaymentData';

const PaymentPage = () => {
  const dispatch = useDispatch();

  const { paymentsList = {}, loading: paymentLoading } = useSelector((state) => state.payment);

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const paymentsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAllPayments(currentPage, paymentsPerPage));
  }, [dispatch, currentPage]);

  const handleAdd = () => setShowModal(true);

  const handleDelete = () => {
    if (selectedItems.length > 0) {
      const deletePaymentWithToast = deletePayment(dispatch, () => {
        dispatch(fetchAllPayments(currentPage, paymentsPerPage));
      });

      selectedItems.forEach((item) => {
        deletePaymentWithToast(item.payment_id);
      });
    }
  };

  const handleEdit = () => {
    if (selectedItems.length === 1) {
      setSelectedPayment(selectedItems[0]);
      setShowUpdateModal(true);
    }
  };

  const payments = Array.isArray(paymentsList?.payments) ? paymentsList.payments : [];

  const pagination = {
    current: currentPage,
    pageSize: paymentsPerPage,
    total: paymentsList?.totalItems || 0,
    onChange: (page) => setCurrentPage(page),
  };

  return (
    <div className="container p-4 d-flex flex-column" style={{ width: '100%' }}>
      <ActionBar
        title="Danh sách thanh toán"
        linkText="Trang chủ"
        to="/dashboard"
        showAdd
        onAdd={handleAdd}
        showEdit
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedCount={selectedItems.length}
        disableEdit={selectedItems.length !== 1}
        disableDelete={selectedItems.length === 0}
        showAttendance={false}
        showScoreEntry={false}
      />

      <PaymentAdd
        show={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => dispatch(fetchAllPayments(currentPage, paymentsPerPage))}
      />

      <PaymentData
        items={payments}
        loading={paymentLoading}
        onSelectItems={setSelectedItems}
        onRowClick={(payment) => {
          setSelectedPayment(payment);
          setSelectedItems([payment]);
        }}
        pagination={pagination}
      />

      <PaymentUpdate
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        paymentData={selectedPayment}
        onSuccess={() => dispatch(fetchAllPayments(currentPage, paymentsPerPage))}
      />
    </div>
  );
};

export default PaymentPage;