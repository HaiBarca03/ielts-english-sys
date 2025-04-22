import React, { useMemo } from 'react';
import { Column } from '@ant-design/plots';

const DashboardChart = ({ payments }) => {
  const chartData = useMemo(() => {
    if (!payments || payments.length === 0) {
      console.warn('No payments data available for the chart.');
      return [];
    }

    const monthlyTotals = payments.reduce((acc, payment) => {
      if (!payment.paid_at || !payment.amount) {
        console.warn('Invalid payment data:', payment);
        return acc;
      }

      const month = new Date(payment.paid_at).toLocaleString('vi-VN', { month: 'long', year: 'numeric' });
      acc[month] = (acc[month] || 0) + parseFloat(payment.amount);
      return acc;
    }, {});

    return Object.entries(monthlyTotals).map(([month, total]) => ({
      month,
      total,
    }));
  }, [payments]);

  const config = {
    data: chartData,
    xField: 'month',
    yField: 'total',
    color: '#1890ff',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoRotate: true,
      },
    },
    yAxis: {
      label: {
        formatter: (value) => `${value.toLocaleString()} VND`,
      },
    },
    tooltip: {
      formatter: (datum) => ({
        name: 'Tổng tiền',
        value: `${datum.total.toLocaleString()} VND`,
      }),
    },
    height: 400,
  };

  return (
    <div>
      <h3 className="dashboard-section-title mt-5">Tổng tiền thanh toán theo tháng</h3>
      {chartData.length > 0 ? (
        <Column {...config} />
      ) : (
        <p>Không có dữ liệu để hiển thị biểu đồ.</p>
      )}
    </div>
  );
};

export default DashboardChart;