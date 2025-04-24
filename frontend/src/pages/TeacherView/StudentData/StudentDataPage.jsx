import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StudentData from '../../../components/Student/StudentData';
import ActionBar from '../../../components/ActionBar';
import StudentAdd from '../../../components/Student/StudentAdd';
import { getClassById } from '../../../stores/classes/classAPI';

const StudentDataPage = () => {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { classDetails, loading: classLoading } = useSelector((state) => state.class);
  const [selectedItems, setSelectedItems] = useState([]);


  useEffect(() => {
    if (classId) {
      dispatch(getClassById(classId));
    }
  }, [dispatch, classId]);
  const users = classId && classDetails?.Users ? classDetails.Users : [];

  const handleAttendance = () => {
      navigate(`/teacher/attendance`);
  };

  return (
    
    <div className="container p-4 d-flex flex-column" style={{ width: '100%' }}>
        <ActionBar
        title="Danh sách học viên"
        linkText="Lớp học" 
        to="/dashboard"
        showAdd = {false}
        showEdit = {false}
        showDelete = {false}
        showSave = {false}
        showAttendance={true}
        onAttendance={handleAttendance}
        showScoreEntry ={true}
        onScoreEntry={() => navigate(`/teacher/score-entry`)}
        ></ActionBar>


    <StudentData
        items={users}
        loading={classLoading}
        onSelectItems={setSelectedItems}
        onRowClick={(user) => {
          setSelectedItems([user]);
        }}
        pagination={null} 
      />
    </div>
  )
}

export default StudentDataPage