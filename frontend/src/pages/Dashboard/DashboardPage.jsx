import React, { useEffect, useState} from 'react';
import { Spin, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClasses, fetchRecentClasses } from '../../stores/classes/classAPI';
import { fetchPrograms, fetchRecentPrograms } from '../../stores/programs/programAPI';
import { getStudentByRole, getTeacherByRole } from '../../stores/users/userAPI';
import { fetchAllPayments } from '../../stores/Payment/paymentAPI';
import './DashboardPage.css';
import DashboardHeader from '../../components/Dashboard/DashboardHeader';
import DashboardStats from '../../components/Dashboard/DashboardStats';
import DashboardChart from '../../components/Dashboard/DashboardChart';
import DashboardTables from '../../components/Dashboard/DashboardTables';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [countStudents, setCountStudents] = useState(0);
  const [countTeachers, setCountTeachers] = useState(0);

  const { paymentList } = useSelector((state) => state.payment);
  const { classesList } = useSelector((state) => state.class);
  const { programsList } = useSelector((state) => state.program);
  const [recentClasses, setRecentClasses] = useState([]);
  const [recentPrograms, setRecentPrograms] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        const [classes, programs, studentsResponse, teachersResponse] = await Promise.all([
          dispatch(fetchRecentClasses()),
          dispatch(fetchRecentPrograms()),
          dispatch(getStudentByRole()),
          dispatch(getTeacherByRole()),
        ]);
        
        setRecentClasses(classes);
        setRecentPrograms(programs);
        
        setCountStudents(studentsResponse?.count || 0);
        setCountTeachers(teachersResponse?.count || 0);

        await Promise.all([
          dispatch(fetchAllPayments()),
          dispatch(fetchClasses()),
          dispatch(fetchPrograms()),
        ]);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setFetchError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="dashboard-error">
        <Alert message={fetchError} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardStats
        studentCount={countStudents}
        teacherCount={countTeachers}
        classCount={classesList.totalClasses}
        programCount={programsList.totalItems}
      />
      <DashboardChart payments={paymentList?.items || []} />
      <DashboardTables recentClasses={recentClasses} recentPrograms={recentPrograms} />
    </div>
  );
};

export default DashboardPage;