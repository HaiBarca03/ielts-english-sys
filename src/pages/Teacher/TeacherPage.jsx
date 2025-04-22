import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ActionBar from '../../components/ActionBar';
import StudentAdd from '../../components/Student/StudentAdd';
import StudentData from '../../components/Student/StudentData';
import UserDelete from '../../components/User/UserDelete';
import UserUpdate from '../../components/User/UserUpdate';
import { getTeacherByRole } from '../../stores/users/userAPI';
import { getClassById } from '../../stores/classes/classAPI';
import TeacherAdd from '../../components/Teacher/TeacherAdd';

const TeacherPage = () => {
  const { classId } = useParams();
  const dispatch = useDispatch();

  const { usersList = {}, loading: userLoading } = useSelector((state) => state.user);
  const { classDetails, loading: classLoading } = useSelector((state) => state.class);

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const usersPerPage = 6;

  useEffect(() => {
    if (classId) {
      dispatch(getClassById(classId));
    } else {
      dispatch(getTeacherByRole(currentPage, usersPerPage));
    }
  }, [dispatch, classId, currentPage]);

  const handleAdd = () => setShowModal(true);

  const handleDelete = () => {
    if (selectedItems.length > 0) {
      const deleteUserWithToast = UserDelete(dispatch, () => {
        if (classId) {
          dispatch(getClassById(classId));
        } else {
          dispatch(getTeacherByRole(currentPage, usersPerPage));
        }
      });

      selectedItems.forEach((item) => {
        deleteUserWithToast(item.user_id);
      });
    }
  };

  const handleEdit = () => {
    if (selectedItems.length === 1) {
      setSelectedUser(selectedItems[0]);
      setShowUpdateModal(true);
    }
  };

  const getUsers = () => {
    if (classId && classDetails?.Users) {
      return classDetails.Users;
    }
    return Array.isArray(usersList?.users) ? usersList.users : [];
  };

  const users = getUsers();

  const pagination = classId
    ? null
    : {
        current: currentPage,
        pageSize: usersPerPage,
        total: usersList?.totalItems || 0,
        onChange: (page) => setCurrentPage(page),
      };

  return (
    <div className="container p-4 d-flex flex-column" style={{ width: '100%' }}>
      <ActionBar
        title={classId ? `Danh sách học viên - ${classDetails?.name || ''}` : 'Danh sách học viên'}
        linkText={classId ? 'Danh sách lớp học' : 'Trang chủ'}
        to={classId ? '/classes' : '/'}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedCount={selectedItems.length}
        disableEdit={selectedItems.length !== 1}
        disableDelete={selectedItems.length === 0}
        showAttendance={false}
        showScoreEntry={false}
        showSave = {false}
      />
        <TeacherAdd
          show={showModal}
          onClose={() => setShowModal(false)}
          classId={classId}
          onSuccess={() => dispatch(getClassById(classId))}
        />

      <StudentData
        items={users}
        loading={userLoading || classLoading}
        onSelectItems={setSelectedItems}
        onRowClick={(user) => {
          setSelectedUser(user);
          setSelectedItems([user]);
        }}
        pagination={pagination}
      />

      <UserUpdate
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        userData={selectedUser}
        onSuccess={() =>
          classId
            ? dispatch(getClassById(classId))
            : dispatch(getTeacherByRole(currentPage, usersPerPage))
        }
      />
    </div>
  );
};

export default TeacherPage;
